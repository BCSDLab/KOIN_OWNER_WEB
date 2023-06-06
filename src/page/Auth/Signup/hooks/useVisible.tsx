import { useRef } from 'react';

export default function useVisible() {
  const visibility = useRef<HTMLInputElement>(null);
  const setVisible = () => {
    if (visibility.current) {
      if (visibility.current.type === 'password') {
        visibility.current.type = 'text';
      } else {
        visibility.current.type = 'password';
      }
    }
  };
  return { visibility, setVisible };
}
