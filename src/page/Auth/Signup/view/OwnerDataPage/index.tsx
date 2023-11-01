import useMediaQuery from 'utils/hooks/useMediaQuery';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import styles from './OwnerData.module.scss';

type ButtonClickEvent = {
  clickEvent: () => void;
};
export default function OwnerData({ clickEvent }:ButtonClickEvent) {
  const { isMobile } = useMediaQuery();
  return (
    <>
      <section className={styles.form}>
        <div>
          <span className={styles.form__label}>대표자명</span>
          <input className={styles.form__input} type="text" placeholder={isMobile ? '대표자명(실명)' : ''} />
        </div>
        <div>
          <span className={styles.form__label}>사업자등록번호</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--first']} type="text" maxLength={3} />
              </div>
              <div className={styles['form__input__registration-number']}>
                <input className={styles['form__input__registration-number--middle']} type="text" maxLength={2} />
              </div>
              <div>
                <input className={styles['form__input__registration-number--last']} type="text" maxLength={5} />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="사업자등록번호" />}
        </div>
        <div>
          <span className={styles.form__label}>개인 연락처</span>
          {!isMobile ? (
            <div className={styles.input}>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--first']} type="text" maxLength={3} pattern="\d*" />
              </div>
              <div className={styles['form__input__phone-number']}>
                <input className={styles['form__input__phone-number--middle']} type="text" maxLength={4} pattern="^[0-9]+$" />
              </div>
              <div>
                <input className={styles['form__input__phone-number--last']} type="text" maxLength={4} pattern="^[0-9]+$" />
              </div>
            </div>
          )
            : <input className={styles.form__input} type="text" placeholder="개인 연락처" />}
        </div>
        <div>
          <span className={styles.form__label}>파일첨부</span>
          <div className={styles['file-box']}>
            <div className={styles['file-box__plus-box-image']} />

            <span className={styles['file-box__command']}>{!isMobile ? '파일을 마우스로 끌어 오세요.' : '파일을 첨부해주세요'}</span>
            <span className={styles['file-box__information']}>
              {!isMobile ? '사업자등록증, 영업신고증, 통장사본 이미지 필수10mb 이하의 PDF 혹은 이미지 형식의 파일(e.g. jpg, png, gif 등)로 5개까지 업로드 가능합니다.' : '사업자등록증, 영업신고증, 통장사본 이미지 첨부'}
            </span>
          </div>
          {!isMobile && (
          <div className={styles.button}>
            <label htmlFor="upload_button" className={styles['button--upload']}>
              <span>내 pc</span>
              <input id="upload_button" type="file" />
            </label>
          </div>
          )}
        </div>
      </section>
      <div className={styles.buttons}>
        <CustomButton buttonSize="large" content={isMobile ? '확인' : '다음'} onClick={clickEvent} />
      </div>
    </>
  );
}
