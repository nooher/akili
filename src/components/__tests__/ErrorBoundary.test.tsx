// ErrorBoundary.test.tsx — verifies the boundary renders children normally and
// shows the Kiswahili fallback when in its error state. Uses react-dom/server so
// no DOM/jsdom environment is required (test env is 'node').
import { describe, it, expect } from 'vitest';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const html = renderToStaticMarkup(
      <ErrorBoundary>
        <p>habari</p>
      </ErrorBoundary>,
    );
    expect(html).toContain('habari');
    expect(html).not.toContain('hitilafu');
  });

  it('renders the Swahili fallback when in error state', () => {
    // Server rendering does not run error boundaries, so drive the boundary into
    // its error state directly and snapshot the fallback markup it produces.
    const boundary = new ErrorBoundary({ children: null });
    boundary.state = { hasError: true };
    const fallback = renderToStaticMarkup(boundary.render() as ReactElement);
    expect(fallback).toContain('Samahani');
    expect(fallback).toContain('hitilafu');
    expect(fallback).toContain('Pakia upya');
    expect(fallback).toContain('role="alert"');
  });
});
