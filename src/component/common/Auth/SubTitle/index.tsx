import styles from './SubTitle.module.scss';

interface SubTitleProps {
  topTitle: string;
  bottomTitle: string;
  topText: string;
  bottomText: string;
}

export default function SubTitle({
  topTitle, bottomTitle = '', topText = '', bottomText = '',
}: SubTitleProps) {
  return (
    <div className={styles.sub}>
      <div className={styles.sub__title}>
        {topTitle}
        <br />
        {bottomTitle}
      </div>
      <div className={styles.sub__text}>
        {topText}
        <br />
        {bottomText}
      </div>
    </div>
  );
}
