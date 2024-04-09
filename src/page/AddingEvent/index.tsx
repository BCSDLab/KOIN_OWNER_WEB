import styles from './AddingEvent.module.scss';

export default function AddingEvent() {
  return (
    <div className={styles.container}>
      <div className={styles.event}>
        <p className={styles.event__paragraph}>제목</p>
        <input
          type="text"
          placeholder="이벤트 제목을 입력해주세요."
          id="title"
          className={styles.event__input}
        />
        <p className={styles.event__paragraph}>이벤트 내용</p>
        <div>
          <textarea />
        </div>

        <p className={styles.event__paragraph}>이벤트 포스터</p>
        <small>이벤트 포스터 등록 방법을 선택해주세요.</small>
      </div>
    </div>
  );
}
