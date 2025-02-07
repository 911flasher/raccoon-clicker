import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { Guild, selectGuildsState } from 'features/guilds';
import { BalanceType, selectSettingsState, setDogecoin, setDonuts, setPepecoin, setShibaInu } from 'features/settings';
import { clickerClient } from '../../client';
import { EventType } from '../../types';
import { selectClickerState } from '../selectors';
import { patchClickerState } from '../slice';

class ClickerService {
  private clickTimeoutId: NodeJS.Timeout | null = null;
  private minuteTimeoutId: NodeJS.Timeout | null = null;
  private accumulatedClicks: number = 0;

  constructor() {
    //const dispatch = useAppDispatch();
    // Инициализация минутного таймера для накопления
    this.startMinuteTimer();
  }

  // Таймер, вызывающий `increment` каждые 60 секунд
  private startMinuteTimer(): void {
   /*  this.minuteTimeoutId = setInterval(() => {
      this.dispatchAccumulatedClicks(dispatch);
    }, 60000); */ // 60 секунд
  }

  // Накопление результата и отправка через dispatch
  private async dispatchAccumulatedClicks(dispatch: any, getState: any = null): Promise<void> {
    if (this.accumulatedClicks > 0) {
      // Обновление состояния и сброс счетчика
      dispatch(patchClickerState({ currentClicks: this.accumulatedClicks }));
      this.accumulatedClicks = 0; // Сброс накопленных кликов
    }
  }

  async submitClicks(dispatch: any, getState: any): Promise<void> {
    if (this.clickTimeoutId) {
      clearTimeout(this.clickTimeoutId);
      this.clickTimeoutId = null;
    }

    try {
      const oldState = getState();
      const { salt, currentClicks, isNextClickResultsLoading } = selectClickerState(oldState);

      if (isNextClickResultsLoading || currentClicks <= 0) {
        this.clickTimeoutId = setTimeout(() => this.submitClicks(dispatch, getState), 5000);
        return;
      }

      const requestParams = {
        count: currentClicks,
        salt,
      };

      dispatch(patchClickerState({ currentClicks: 0, isNextClickResultsLoading: true }));

      const { salt: newSalt, energy, currentPoints, event } = await clickerClient.requestMoreClicks(requestParams);

      let activeEvent: EventType = null;
      let eventEndTime: string | null = null;
      let timeoutId: number | null = null;

      if (event) {
        activeEvent = event.data.token;
        eventEndTime = event.data.expired;

        const state = getState();
        const { timeoutId: oldTimeoutId } = selectClickerState(state);

        const dateNow = dayjs();
        const dateEnd = dayjs(eventEndTime);
        const diff = dateEnd.diff(dateNow);
        console.log("submitClicks: diff =",diff)
        if (diff > 0) {
          if (oldTimeoutId) clearTimeout(oldTimeoutId);

          timeoutId = window.setTimeout(() => {
            dispatch(patchClickerState({ activeEvent: null, eventEndTime: null, timeoutId: null }));
          }, diff);
        }
      }

      dispatch(
        patchClickerState({
          salt: newSalt,
          remainingEnergy: energy,
          isNextClickResultsLoading: false,
          activeEvent,
          eventEndTime,
          timeoutId,
        }),
      );
      dispatch(setDonuts(currentPoints));
    } catch (e) {
      dispatch(patchClickerState({ isNextClickResultsLoading: false }));
    }

    this.clickTimeoutId = setTimeout(() => this.submitClicks(dispatch, getState), 5000);
  }

  async increment(dispatch: any, getState: any): Promise<string> {
    const state = getState();
    const { donuts, dogecoin, pepecoin, shibaInu } = selectSettingsState(state);
    const { remainingEnergy, currentClicks, activeEvent } = selectClickerState(state);
    const { currentGuild } = selectGuildsState(state);

    const newRemainingEnergy = BigNumber(remainingEnergy).minus(1);
    let incrementCount = '1';
    switch (currentGuild) {
      case Guild.Maggie:
        incrementCount = '0.1';
        break;
      case Guild.Lisa:
        incrementCount = '0.3';
        break;
      case Guild.Bart:
        incrementCount = '0.5';
        break;
      case Guild.Marge:
        incrementCount = '0.7';
        break;
      default:
        incrementCount = '1';
    }

    if (newRemainingEnergy.lt(0)) return '0';

    // Накопление кликов
    this.accumulatedClicks += 1;
    console.log("increment: diff =",incrementCount)
    dispatch(
      patchClickerState({
        remainingEnergy: newRemainingEnergy.toString(),
        currentClicks: currentClicks + 1,
      }),
    );

    switch (activeEvent) {
      case BalanceType.Dogecoin:
        dispatch(setDogecoin(BigNumber(dogecoin).plus(incrementCount).toString()));
        break;
      case BalanceType.Pepecoin:
        dispatch(setPepecoin(BigNumber(pepecoin).plus(incrementCount).toString()));
        break;
      case BalanceType.ShibaInu:
        dispatch(setShibaInu(BigNumber(shibaInu).plus(incrementCount).toString()));
        break;
      default:
        dispatch(setDonuts(BigNumber(donuts).plus(incrementCount).toString()));
    }

    return incrementCount;
  }
}

export const clickerService = new ClickerService();
