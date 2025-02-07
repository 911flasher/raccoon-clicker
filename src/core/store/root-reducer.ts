import { combineReducers } from '@reduxjs/toolkit'

import { boostsSlice } from 'features/boost'
import { clickerSlice } from 'features/clicker/store'
import { dailyRewardsSlice } from 'features/daily-rewards'
import { friendsSlice } from 'features/friends'
import { guildsSlice } from 'features/guilds'
import { leadersSlice } from 'features/leaders'
import { marketSlice } from 'features/market'
import { presaleSlice } from 'features/presale'
import { settingsSlice } from 'features/settings'
import { tasksSlice } from 'features/tasks'


interface CounterState {
  count: number;
}

// Define the initial state with a type
const initialState: CounterState = { count: 0 };

// Type the action as well
type CounterAction = {
  type: "INCREMENT" | "DECREMENT";
};

// Reducer with typed state and action
const counterReducer: Reducer<CounterState, CounterAction> = (state = initialState, action:any) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};


export default combineReducers({
  clicker: clickerSlice.reducer,
  boosts: boostsSlice.reducer,
  tasks: tasksSlice.reducer,
  leaders: leadersSlice.reducer,
  friends: friendsSlice.reducer,
  settings: settingsSlice.reducer,
  dailyRewards: dailyRewardsSlice.reducer,
  market: marketSlice.reducer,
  guilds: guildsSlice.reducer,
  presale: presaleSlice.reducer,
  counter: counterReducer,
})


