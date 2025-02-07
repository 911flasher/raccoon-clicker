import { FC } from 'react'

import { Wheel } from 'react-custom-roulette'

import pointerImage from './assets/pointer.svg'
import spinnerBackground from './assets/spinner.png'
import { data } from './constants'
import styles from './styles.module.scss'

interface Props {
  isWin: boolean
  isSpinning: boolean
  onSpinEnd: () => void
}

export const Spinner: FC<Props> = ({ isWin, isSpinning, onSpinEnd }) => {
  return (
    <div className={styles.container}>
      <img src={spinnerBackground} className={styles.spinnerBack} alt='spinner' draggable={false}/>
      <img className={styles.pin} src={pointerImage} alt='pointer' draggable={false} />

      <div className={styles.spinnerContainer}>
        <Wheel
          mustStartSpinning={isSpinning}
          prizeNumber={isWin ? 0 : 1}
          data={data}
          backgroundColors={['#FF6632', '#FFFFFF']}
          textColors={['#ffffff']}
          onStopSpinning={onSpinEnd}
          disableInitialAnimation
        />
      </div>
    </div>
  )
}
