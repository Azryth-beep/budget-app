import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './components/App.tsx';
import LoginForm from './components/LoginForm.tsx';
import RegisterForm from './components/RegisterForm.tsx';
import Dashboard from './pages/Dashboard.tsx';

const router = createBrowserRouter([
	{ path: '/', Component: App },
	{ path: '/login', Component: LoginForm },
	{ path: '/register', Component: RegisterForm },
  {path: '/dashboard', Component: Dashboard},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
