import styles from './StoreRegSubTitle.module.scss';

interface StoreRegSubTitleProps {
  title: string;
  topText: string;
  bottomText: string;
}

export default function StoreSubTitle({ title, topText = '', bottomText = '' }: StoreRegSubTitleProps) {
  return (
    <div className={styles.sub}>
      <div className={styles.sub__title}>{title}</div>
      <div className={styles.sub__text}>
        {topText}
        <br />
        {bottomText}
      </div>
    </div>
  );
}
