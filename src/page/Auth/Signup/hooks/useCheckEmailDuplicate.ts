import { useCheckDuplicate } from 'query/register';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { SubmitHandler } from 'react-hook-form';
import { User } from 'page/Auth/Signup/types/User';
import useRegisterInfo from 'store/registerStore';
import { isKoinError } from '@bcsdlab/koin';

export default function useCheckEmailDuplicate(isMobile: boolean) {
  const [email, setEmail] = useState<string>('');
  const { status, refetch, error } = useCheckDuplicate(email);
  const { userInfo: userData, setUserInfo: setId } = useRegisterInfo();
  const debounceSearch = useRef<NodeJS.Timeout>();
  const errorMessage = isKoinError(error) && error.status === 409 ? '이미 사용중인 아이디입니다.' : null;
  const onSubmit:SubmitHandler<User> = (data) => {
    setEmail(() => (data.email ? data.email : ''));
  };

  const delaySearch = useCallback(() => {
    debounceSearch.current = setTimeout(() => {
      refetch();
    }, 1000);
  }, [refetch]);

  useEffect(() => {
    if (email !== '') {
      if (isMobile) {
        delaySearch();
      } else {
        refetch();
      }
    }
    return () => clearTimeout(debounceSearch.current);
  }, [email, refetch, isMobile, debounceSearch, delaySearch]);
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
    status, onSubmit, email, errorMessage,
  };
}
