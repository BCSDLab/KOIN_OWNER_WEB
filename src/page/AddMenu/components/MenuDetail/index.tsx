import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import styles from './MenuDetail.module.scss';

interface MenuCategoryProps {
  isComplete:boolean;
}
export default function MenuDetail({ isComplete }:MenuCategoryProps) {
  const { isMobile } = useMediaQuery();
  const [detail, setDetail] = useState('');
  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };
  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__caption}>메뉴구성</div>
          {isComplete ? (
            <div className={styles['mobile__menu-detail-input--complete']}>{detail}</div>
          ) : (
            <textarea
              className={styles['mobile__menu-detail-input']}
              placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)"
              onChange={handleDetailChange}
              value={detail}
            />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>메뉴구성</div>
          {isComplete ? (
            <div className={styles['menu-detail-input--complete']}>{detail}</div>
          ) : (
            <textarea
              className={styles['menu-detail-input']}
              placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)"
              onChange={handleDetailChange}
              value={detail}
            />
          )}
        </div>
      )}
    </div>
  );
}
