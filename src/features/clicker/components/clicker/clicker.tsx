import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { sleep } from 'core/utils/sleep';
import { increment } from 'features/clicker/store/actions/init';
import { selectGuildsState } from 'features/guilds';
import { haptic } from 'features/tg-api';
import _ from 'lodash';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { selectClickerState } from '../../store/selectors';
import CanvasApp from '../canvas/CanvasApp';
import styles from './styles.module.scss';
import { calculateRotate, chooseIconByGuild } from './utils';

const Clicker: FC = () => {
  const [pointClickObj, setPointClickObj] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevPointClickRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dispatch = useAppDispatch();
  const { currentGuild } = useAppSelector(selectGuildsState);
  const { activeEvent } = useAppSelector(selectClickerState);
  const coinRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const rotateXRef = useRef(0);
  const rotateYRef = useRef(0);

  const animationTrigger = _.throttle(async (x: number, y: number) => {
    if (coinRef.current) {
      const [angleX, angleY] = calculateRotate(coinRef.current.getBoundingClientRect(), { x, y });

      scaleRef.current = 0.99;
      rotateXRef.current = angleX;
      rotateYRef.current = angleY;

      requestAnimationFrame(animateCoin);

      await sleep(100);

      scaleRef.current = 1;
      rotateXRef.current = 0;
      rotateYRef.current = 0;

      requestAnimationFrame(animateCoin);
    }
    haptic();
  }, 200);

  const handleAddClick = useCallback(async () => {
    try {
      console.log('Click added');
      const result = await dispatch(increment()).unwrap();
      console.log('Click added, result:', result);
      animationTrigger(pointClickObj.x, pointClickObj.y);
    } catch (error) {
      console.error('Failed to increment:', error);
    }
  }, [dispatch, pointClickObj.x, pointClickObj.y]);
/* 
  const handleMouseDown = (e: React.MouseEvent) => {
    setPointClickObj({ x: e.clientX, y: e.clientY });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setPointClickObj({ x: touch.clientX, y: touch.clientY });
  };
 */
  useEffect(() => {
    const prevPointClick = prevPointClickRef.current;

    if (
      pointClickObj.x !== prevPointClick.x ||
      pointClickObj.y !== prevPointClick.y
    ) {
      
      handleAddClick();
      prevPointClickRef.current = pointClickObj;
    }
  }, [pointClickObj, handleAddClick]);

  const animateCoin = useCallback(() => {
    if (coinRef.current) {
      coinRef.current.style.transform = `translate3d(0, 0, 0) perspective(900px) scale(${scaleRef.current}) rotateX(${rotateXRef.current}deg) rotateY(${rotateYRef.current}deg)`;
    }
  }, []);

  return (
    <div
      className={styles.wrapper}
      role='presentation'
      // onMouseDown={handleMouseDown}
      // onTouchStart={handleTouchStart}
      ref={coinRef}
    >
      <div className={styles.clickerWrapper}>
        <div className={styles.clickerInnerCircle} />
        <img
          className={styles.clickerImage}
          src={chooseIconByGuild(currentGuild, activeEvent)}
          alt='clicker'
        />
      </div>
      <CanvasApp callback={setPointClickObj} src={chooseIconByGuild(currentGuild, activeEvent)} /> 
    </div>
  );
};

export default Clicker;
