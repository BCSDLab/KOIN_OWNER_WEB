/* eslint-disable no-console */
const checkEnvVar = (name: string) => {
  const envVar = process.env[name];
  if (!envVar) {
    console.error(`환경변수 파일에 ${name}가 존재하지 않습니다!`);
    return '';
  }
  return envVar;
};

// API 공통
export const API_PATH = checkEnvVar('REACT_APP_API_PATH');

// 네이버 지도
export const NAVER_MAPS_CLIENT_ID = checkEnvVar('REACT_APP_NAVER_MAPS_CLIENT_ID');
