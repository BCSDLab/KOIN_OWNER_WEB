/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';
import ErrorIcon from 'assets/svg/error/error.svg?react';
import styles from './ErrorBoundary.module.scss';

export interface Props {
  message?: string;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, message } = this.props;

    if (hasError) {
      return (
        <div className={styles.error}>
          <div className={styles.error__contents}>
            <ErrorIcon className={styles.error__icon} />
            {message}
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
