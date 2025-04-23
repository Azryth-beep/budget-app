import { Navigate } from 'react-router-dom';
import { useStore } from '../store';
import IncomeForm from '../components/IncomeForm';
import IncomeTable from '../components/IncomeTable';

export default function Dashboard() {
	const { user } = useStore();

	if (!user?.token) return <Navigate to='/login' replace />;

	return (
		<div className='p-4 max-w-4xl mx-auto'>
			<h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
			<IncomeForm />
			<IncomeTable />
		</div>
	);
}
