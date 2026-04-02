import { Component, type ReactNode, type ErrorInfo } from "react";

export interface ErrorBoundaryBaseProps {
  fallback: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, info: ErrorInfo) => void;
  resetQuery: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryBase extends Component<
  ErrorBoundaryBaseProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  reset = (): void => {
    this.props.resetQuery();
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    const { fallback } = this.props;

    if (typeof fallback === "function") {
      return fallback(this.state.error, this.reset);
    }

    return fallback;
  }
}

export default ErrorBoundaryBase;
