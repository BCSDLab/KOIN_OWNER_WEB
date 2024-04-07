import { KoinError } from 'model/error';

export function isKoinError(error: unknown): error is KoinError {
  try {
    // 코인 서버 에러인지 아닌지를 확인
    return (error as KoinError).type === 'KOIN_ERROR';
  } catch {
    return false;
  }
}
