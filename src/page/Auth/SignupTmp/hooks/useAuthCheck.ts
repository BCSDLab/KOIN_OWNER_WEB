export {};
/* eslint-disable max-len */// import { useGenerateAuthCode } from 'query/register';

// import { useEffect, useState } from 'react';
// import { SubmitHandler } from 'react-hook-form';
// import { User } from 'page/Auth/SignupTmp/types/User';
// import { AxiosError } from 'axios';

// export default function useAuthCheck(userEmail:string, isMobile:boolean) {
//   const [email, setEmail] = useState('');
//   const [isOpen, setOpen] = useState(false);
//   const {
//     status, refetch, isError, error,
//   } = useGenerateAuthCode(email);
//   const errorMessage = isError ? (error as AxiosError).message : null;
//   const onSubmit:SubmitHandler<User> = (data) => {
//     setEmail(() => (data.email ? data.email : ''));
//   };

//   useEffect(() => {
//     if (isMobile) {
//       setEmail(userEmail);
//     }
//   }, [isMobile, userEmail]);

//   useEffect(() => {
//     if (email !== '') {
//       refetch();
//     }
//   }, [email, refetch]);

//   useEffect(() => {
//     if (status === 'success') {
//       setOpen(true);
//     }
//   }, [status, isError, error]);

//   return {
//     onSubmit, isOpen, errorMessage, email, refetch, status, error,
//   };
// }
