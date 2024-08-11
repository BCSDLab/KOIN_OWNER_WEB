import { ReactComponent as Success } from 'assets/svg/auth/done.svg';
import { useNavigate } from 'react-router-dom';
import ROUTES from 'static/routes';
import styles from './index.module.scss';

const completeFindPassword = {
  title: '비밀번호 변경 완료',
  content: '비밀번호 변경이 완료되었습니다!',
  final: '새로운 비밀번호로 로그인해주세요:)',
};

const completeRegister = {
  title: '회원가입 완료',
  content: '회원가입이 완료되었습니다!',
  final: '가입 승인 시 로그인이 가능합니다.',
};

interface Props {
  isFindPassword: boolean;
}
export default function Done({ isFindPassword }: Props) {
  const completeObject = isFindPassword ? completeFindPassword : completeRegister;
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Success />
      <div className={styles.title}>
        {completeObject.title}
      </div>
      <div className={styles.content}>
        <div>
          {completeObject.content}
        </div>
        <div>
          {completeObject.final}
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate(ROUTES.LOGIN)}
        className={styles.button}
      >
        {isFindPassword ? '로그인하러 가기' : '로그인 화면 바로가기'}
      </button>
    </div>
  );
}
