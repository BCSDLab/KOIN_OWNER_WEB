import { useCheckDuplicate } from 'query/register';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { RegisterData } from 'page/Auth/Signup/types/Register';

export default function useCheckEmailDuplicate(
  userData:RegisterData,
  setId: (data:RegisterData) => void,
  isMobile: boolean,
) {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setMessage] = useState('');
  const { status, refetch, error } = useCheckDuplicate(email);

  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    setEmail(() => (data.email ? data.email : ''));
  };
  const onMobileSubmit:SubmitHandler<RegisterData> = (data) => {
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
