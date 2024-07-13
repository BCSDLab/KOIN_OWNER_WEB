export {};
/* eslint-disable max-len */
// import { isKoinError } from '@bcsdlab/koin';
// import { useVerificationAuthCode } from 'query/register';
// import { useEffect, useRef, useState } from 'react';
// import useRegisterInfo from 'store/registerStore';
// import useUploadToken from 'store/uploadToken';

// export default function useVerification(
//   eamil:string,
// ) {
//   const [code, setCode] = useState('');
//   const [errorMessage, setMessage] = useState<string>('');
//   const codeInput = useRef<HTMLInputElement>(null);
//   const { userInfo: userData, setUserInfo: setAuthenticate } = useRegisterInfo();
//   const {
//     status, refetch, isError, error, data,
//   } = useVerificationAuthCode(code, eamil);
//   const { setUploadToken } = useUploadToken();
//   const verificationCode = () => {
//     if (codeInput.current) {
//       setCode(codeInput.current.value);
//     }
//   };

//   useEffect(() => {
//     if (code !== '') {
//       refetch();
//     }
//   }, [code, refetch]);

//   useEffect(() => {
//     if (status === 'success' && !userData.isAuthentication && data) {
//       setAuthenticate({ ...userData, isAuthentication: true });
//       setMessage('');
//       setUploadToken(data.token);
//     }
//     if (isError) {
//       if (isKoinError(error)) {
//         setMessage(error.message);
//       }
//     }
//     if (!isError) {
//       setMessage('');
//     }
//   }, [status, userData, setAuthenticate, error, isError, data, setUploadToken]);
//   return {
//     isError, error, verificationCode, status, codeInput, errorMessage,
//   };
// }
