import { useCheckDuplicate } from 'query/register';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { User } from 'page/Auth/Signup/types/User';
import useRegisterInfo from 'store/registerStore';

export default function useCheckEmailDuplicate(isMobile: boolean) {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setMessage] = useState('');
  const { status, refetch, error } = useCheckDuplicate(email);
  const { userInfo: userData, setUserInfo: setId } = useRegisterInfo();

  const onSubmit:SubmitHandler<User> = (data) => {
    setEmail(() => (data.email ? data.email : ''));
  };
  const onMobileSubmit:SubmitHandler<User> = (data) => {
    if (isMobile) {
      onSubmit(data);
    }
  };
  useEffect(() => {
    if (email !== '') {
      refetch();
    }
  }, [email, refetch]);
  useEffect(() => {
    if (status === 'success' && userData.email !== email) {
      setId({ ...userData, email });
    } else {
      setMessage(Object(error).response?.data.message);
    }
  }, [status, setId, email, userData, error]);
  return {
    status, onSubmit, onMobileSubmit, email, errorMessage,
  };
}
