import styles from './OwnerData.module.scss';

export default function OwnerData() {
  return (
    <section className={styles.form}>
      <div>
        <span className={styles.form__label}>대표자명</span>
        <input className={styles.form__input} type="text" />
      </div>
      <div>
        <span className={styles.form__label}>사업자등록번호</span>
        <div className={styles['input--wrapper']}>
          <div className={`${styles['form__input__registration--number']}`}>
            <input className={`${styles['form__input__registration--number__first']}`} type="text" maxLength={3} />
          </div>
          <div className={`${styles['form__input__registration--number']}`}>
            <input className={`${styles['form__input__registration--number__middle']}`} type="text" maxLength={2} />
          </div>
          <div>
            <input className={`${styles['form__input__registration--number__last']}`} type="text" maxLength={5} />
          </div>
        </div>
      </div>
      <div>
        <span className={styles.form__label}>파일첨부</span>
        <div className={styles['file--box']}>
          <div className={styles['file--box__plus--box--image']} />
          <span className={styles['file--box__command']}>파일을 마우스로 끌어 오세요.</span>
          <span className={styles['file--box__information']}>
            사업자등록증, 영업신고증, 통장사본 이미지 필수
            10mb 이하의 PDF 혹은 이미지 형식의
            파일(e.g. jpg, png, gif 등)로 5개까지 업로드 가능합니다.
          </span>
        </div>
        <div className={styles['button--wrapper']}>
          <label htmlFor="upload_button" className={styles['button--wrapper__upload--button']}>
            <span>내 pc</span>
            <input id="upload_button" type="file" />
          </label>
        </div>
      </div>
    </section>
  );
}
