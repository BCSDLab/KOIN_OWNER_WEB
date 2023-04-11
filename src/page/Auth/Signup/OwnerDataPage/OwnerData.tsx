import styles from './OwnerData.module.scss';

export default function OwnerData() {
  return (
    <section className={styles.page_wrapper}>
      <div>
        <span className={styles.label}>대표자명</span>
        <input className={styles.owner_input} type="text" />
      </div>
      <div>
        <span className={styles.label}>사업자등록번호</span>
        <div className={styles.input_wrapper}>
          <div className={styles.test}>
            <input className={styles.owner_input} type="text" maxLength={3} />
          </div>
          <div className={styles.test}>
            <input className={styles.owner_input} type="text" maxLength={2} />
          </div>
          <input className={styles.owner_input} type="text" maxLength={5} />
        </div>
      </div>
      <div>
        <span className={styles.label}>파일첨부</span>
        <div className={styles.file_box}>
          <div className={styles.plus_button} />
          <span className={styles.help}>파일을 마우스로 끌어 오세요.</span>
          <span className={styles.information}>
            사업자등록증, 영업신고증, 통장사본 이미지 필수
            10mb 이하의 PDF 혹은 이미지 형식의
            파일(e.g. jpg, png, gif 등)로 5개까지 업로드 가능합니다.
          </span>
        </div>
        <div className={styles.button_wrapper}>
          <label htmlFor="upload_button" className={styles.upload_button}>
            <span>내 pc</span>
            <input id="upload_button" type="file" />
          </label>
        </div>
      </div>
    </section>
  );
}
