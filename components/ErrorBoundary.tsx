'use client';

import React, { Component, ReactNode } from 'react';
import { Alert, Button } from 'antd';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
          <div className="max-w-lg w-full">
            <Alert
              message="Something went wrong"
              description={
                <div>
                  <p className="mb-4">
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </p>
                  <Button type="primary" onClick={this.handleReset}>
                    Try Again
                  </Button>
                </div>
              }
              type="error"
              showIcon
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
