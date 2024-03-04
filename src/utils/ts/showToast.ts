import { ToastOptions, toast } from 'react-toastify';

const TOAST_TYPE = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  info: 'INFO',
  error: 'ERROR',
  warning: 'WARNING',
} as const;

type ToastType = keyof typeof TOAST_TYPE;

const showToast = (type: ToastType, message: string) => toast(message, {
  type: TOAST_TYPE[type] as ToastOptions['type'],
  autoClose: 3000,
  progressStyle: { background: '#175C8E' },
});

export default showToast;
