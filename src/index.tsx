import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PortalProvider from 'component/common/Modal/PortalProvider';
import { ZodError } from 'zod';
import ErrorBoundary from 'component/common/ErrorBoundary';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      throwOnError: (err) => err instanceof ZodError,
    },
    mutations: {
      throwOnError: (err) => err instanceof ZodError,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary message="에러가 발생했습니다.">
      <PortalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PortalProvider>
    </ErrorBoundary>
  </QueryClientProvider>,
);
