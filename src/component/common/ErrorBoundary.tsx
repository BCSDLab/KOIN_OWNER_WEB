/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            에러 발생:
            {message}
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
