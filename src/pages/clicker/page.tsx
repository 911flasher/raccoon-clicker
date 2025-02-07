import { increment } from 'features/clicker/store/actions/init';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'core/store';
import { AdsBoosts } from 'features/boost';
import Clicker from 'features/clicker/components/clicker/clicker';
import { EnergyCount } from 'features/clicker/components/energy-count';
import { PrisesSpinnerButton, SpinnerModal } from 'features/daily-rewards';
import { GuildsButton } from 'features/guilds';
import { PointsCounter } from '../../features/clicker/components/points-counter/points-counter';
import styles from './styles.module.scss';


export const ClickerPage: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [pointCLickObj, setPointClickObl] = useState(null);
  const dispatch: AppDispatch = useDispatch() 

  // Function that dispatches the increment action
  const incrementAction = async () => {
    try {
      //await  dispatch(increment()).unwrap() // Dispatch the increment action and unwrap the promise if necessary
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

  // Function to be called every 2 seconds
  const handleTimerEvent = () => {
   // incrementAction(); // Call the increment action every 2 seconds
  }

  useEffect(() => {
     // Set up a timer that calls handleTimerEvent every 2 seconds (2000 ms)
   /*  const timer = setInterval(() => {
      handleTimerEvent()
    }, 100)

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer)  */
  }, [])

  const handleOpen = (): void => setIsOpened(true)
  const handleClose = (): void => setIsOpened(false)
  return (
    <div className={styles.container}>
      <AdsBoosts />
      <PointsCounter />
      <EnergyCount />
      <PrisesSpinnerButton className={styles.spinner} onOpen={handleOpen} />
      <Clicker />
      <GuildsButton /> 
      <SpinnerModal isOpen={isOpened} onClose={handleClose} />
    </div>
  )
}
