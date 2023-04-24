/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';

export interface Props {
  fallback: React.ElementType;
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
        <this.props.fallback
          message={message}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
