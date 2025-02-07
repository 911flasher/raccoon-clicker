import { useAppSelector } from 'core/store/hooks';
import { isNumberHasDecimalPart } from "core/utils/is-number-has-decimal-part";
import { Guild, selectGuildsState } from 'features/guilds';
import { BalanceType, selectSettingsState } from 'features/settings';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';
import { selectClickerState } from '../../store';
import { coinIcons } from './constants';
import styles from './styles.module.scss';

export const PointsCounter: FC = () => {
  const { activeEvent } = useAppSelector(selectClickerState);
  const { donuts, pepecoin, dogecoin, shibaInu } = useAppSelector(selectSettingsState);
  const { currentGuild } = useAppSelector(selectGuildsState);

  const [displayedBalance, setDisplayedBalance] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0); // Для хранения времени последнего обновления

  const balance = useMemo(() => {
    switch (activeEvent) {
      case BalanceType.Dogecoin:
        return dogecoin;
      case BalanceType.Pepecoin:
        return pepecoin;
      case BalanceType.ShibaInu:
        return shibaInu;
      default:
        return donuts;
    }
  }, [activeEvent, dogecoin, pepecoin, donuts, shibaInu]);

  const image = useMemo(() => {
    switch (activeEvent) {
      case BalanceType.Dogecoin:
        return coinIcons[BalanceType.Dogecoin];
      case BalanceType.Pepecoin:
        return coinIcons[BalanceType.Pepecoin];
      case BalanceType.ShibaInu:
        return coinIcons[BalanceType.ShibaInu];
      default:
        return coinIcons[BalanceType.Donuts];
    }
  }, [activeEvent]);

  // Handles the animation frame for updating the displayed balance
  const updateBalance = useCallback((newBalance: number) => {
    const now = Date.now();
    console.log("newBalance = ",newBalance,now);
    // if (now - lastUpdateTimeRef.current >= 100) {  // Проверяем, прошло ли 0.5 секунды
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);  // Отменяем предыдущий кадр, если он существует
      }

      const animate = () => {
        setDisplayedBalance((prev) => (prev !== newBalance ? newBalance : prev));
        requestRef.current = null;
      };

      requestRef.current = requestAnimationFrame(animate);
      // lastUpdateTimeRef.current = now;  // Обновляем время последнего обновления
    //  }
  }, []);

  useEffect(() => {
    updateBalance(Number(balance));

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);  // Очищаем таймер при размонтировании компонента
        requestRef.current = null;
      }
    };
  }, [balance, updateBalance]);

  return (
    <div className={styles.text}>
      <img src={image.icon} alt={image.alt} style={{ width: 32, height: 32 }} draggable={false} />

      <div className={styles.counter}>
      <AnimatedCounter
          value={displayedBalance}
          color="var(--text-primary)"
          incrementColor="var(--text-primary)"
          decrementColor="var(--text-primary)"
          fontSize="32px"
          decimalPrecision={!isNumberHasDecimalPart(displayedBalance) && currentGuild === Guild.Homer ? 0 : 1}
        />
        {/* <NumberFlow value={displayedBalance} trend={false} className={{fontSize:"32px"}}/> */}
      </div>
    </div>
  );
};
       