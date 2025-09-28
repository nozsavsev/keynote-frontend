import styles from './LoadingRing.module.css';

const LoadingRing = () => {
  return (
    <div className={styles.ldsDualRing} />
  );
};

export const LoadingRingAdaptive = () => {
  return (
    <div className={styles.ldsDualRingAdaptive} />
  );
};

export default LoadingRing;