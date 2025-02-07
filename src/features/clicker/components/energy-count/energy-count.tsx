import BigNumber from 'bignumber.js';
import { motion } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'core/components/text';
import { useAppSelector } from 'core/store/hooks';
import { deleteDecimalPart } from 'core/utils/delete-decimal-part';
import { formatNumber } from 'core/utils/format-number';
import { selectSettingsState } from 'features/settings';

import { selectClickerState } from '../../store/selectors';
import styles from './styles.module.scss';

export const EnergyCount: FC = () => {
  const { userInfo } = useAppSelector(selectSettingsState);
  const { remainingEnergy, totalEnergy } = useAppSelector(selectClickerState);

  const remainingEnergyInt = deleteDecimalPart(remainingEnergy);
  const { t } = useTranslation();

  const [progress, setProgress] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Calculates the new progress percentage based on the remaining energy and total energy
  const calculateProgress = useCallback(() => {
    return BigNumber(remainingEnergy).div(totalEnergy).multipliedBy(100).toNumber();
  }, [remainingEnergy, totalEnergy]);

  // Updates progress and re-renders the component only when necessary
  const updateProgress = useCallback(() => {
    const newProgress = calculateProgress();

    if (progress !== newProgress) {
      setProgress(newProgress); // Only update if the progress has changed
    }

    // Schedule the next animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateProgress); // Recursive frame update
  }, [progress, calculateProgress]);

  // Effect to start the animation and ensure cleanup on unmount or state change
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current); // Clean up animation frames on unmount
        animationFrameRef.current = null; // Reset ref to prevent memory leak
      }
    };
  }, [updateProgress]); // Ensure updateProgress is recalculated if its dependencies change

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text>{t('Energy')}</Text>
        <Text>{t('Level')} {userInfo?.level}</Text>
      </div>

      <div className={styles.progressWrapper}>
        <motion.div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <Text className={styles.remainingEnergy}>
        {formatNumber(remainingEnergyInt)} {t('from')} {formatNumber(totalEnergy)}
      </Text>
    </div>
  );
};
