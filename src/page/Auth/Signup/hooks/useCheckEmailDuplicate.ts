import { useCheckDuplicate } from 'query/register';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { User } from 'page/Auth/Signup/types/User';
import useRegisterInfo from 'store/registerStore';

export default function useCheckEmailDuplicate(isMobile: boolean) {
  const [email, setEmail] = useState<string>('');
  const { status, refetch, error } = useCheckDuplicate(email);
  const { userInfo: userData, setUserInfo: setId } = useRegisterInfo();
  const errorMessage:string | undefined = status === 'error' ? Object(error).response.data.message : null;
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
    } else if (Object(error).response) {
      if (userData.email) {
        setId({ ...userData, email: undefined });
      }
    }
  }, [status, setId, email, error, userData]);

  return {
    status, onSubmit, onMobileSubmit, email, errorMessage,
  };
}
