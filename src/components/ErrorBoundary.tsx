// ErrorBoundary.tsx — calm Kiswahili fallback for unexpected render errors.
// Catches errors from the React tree below it, reports them to the telemetry
// seam (no PII), and offers a reload. Class component because React error
// boundaries must use getDerivedStateFromError / componentDidCatch.
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { reportError } from '../lib/telemetry';
import './error-boundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Report message/name only; componentStack is not sent (may reveal structure).
    reportError(error, {
      boundary: 'app',
      hasComponentStack: Boolean(info?.componentStack),
    });
  }

  private handleReload = (): void => {
    try {
      window.location.reload();
    } catch {
      /* ignore — best effort */
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div role="alert" className="akili-boundary">
          <div className="akili-boundary-card">
            <span className="akili-boundary-mark" aria-hidden="true" />
            <h1>Samahani — kuna hitilafu.</h1>
            <p>Jaribu kupakia upya.</p>
            <button
              type="button"
              className="akili-boundary-btn"
              onClick={this.handleReload}
            >
              Pakia upya
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
