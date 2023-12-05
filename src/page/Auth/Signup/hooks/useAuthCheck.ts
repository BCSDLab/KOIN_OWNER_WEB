import { useGenerateAuthCode } from 'query/register';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { RegisterData } from 'page/Auth/Signup/types/Register';

export default function useAuthCheck(userEmail:string, isMobile:boolean) {
  const [email, setEmail] = useState('');
  const [errorMessage, setMessage] = useState<string | null>('');
  const [isOpen, setOpen] = useState(false);
  const {
    status, refetch, isError, error,
  } = useGenerateAuthCode(email);

  const onSubmit:SubmitHandler<RegisterData> = (data) => {
    setEmail(() => (data.email ? data.email : ''));
  };

  useEffect(() => {
    if (isMobile) {
      setEmail(userEmail);
    }
  }, [isMobile, userEmail]);

  useEffect(() => {
    if (email !== '') {
      refetch();
    }
  }, [email, refetch]);

  useEffect(() => {
    if (status === 'success') {
      setOpen(true);
    } else {
      setMessage(Object(error).response?.data.message);
    }
  }, [status, isError, error]);

  return {
    onSubmit, isOpen, errorMessage, email, refetch,
  };
}
