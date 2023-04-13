import styles from './Term.module.scss';

export default function Term({ id }: any) {
  return (
    <section className={styles.term}>
      <span className={styles.term__title}>개인정보이용약관</span>
      <div className={styles.term__content}>
        제1조 개인정보의 처리 목적 (‘koreatech.in’이하 ‘코인’) 은(는) 다음의
        목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는
        이용하지 않습니다.
        <br />
        - 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른
        본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액
        결제, 물품 또는 서비스의 공급.배송 등
        <br />
        <br />
        제 2조 개인정보의 처리 및 보유
        기간 ① (‘koreatech.in’이하 ‘코인’) 은(는) 정보주체로부터 개인정보를 수
        제1조 개인정보의 처리 목적 (‘koreatech.in’이하 ‘코인’) 은(는) 다음의
        목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는
        이용하지 않습니다. - 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른
        본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액
        결제, 물품 또는 서비스의 공급.배송 등 제 2조 개인정보의 처리 및 보유
        기간 ① (‘koreatech.in’이하 ‘코인’) 은(는) 정보주체로부터 개인정보를 수
      </div>
      <label htmlFor={id} className={styles.term__agree}>
        <input id={id} type="checkbox" className={styles.term__agree__checkbox} />
        개인정보 이용약관에 동의합니다.
      </label>
    </section>
  );
}
