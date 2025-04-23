import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store';

const fetchIncomes = async (token: string) => {
	const response = await fetch('http://localhost:3000/api/incomes', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) throw new Error('Failed to fetch incomes');
	return response.json();
};

export default function IncomeTable() {
	const { user, format } = useStore();
	const {
		data: incomes,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['incomes'],
		queryFn: () => fetchIncomes(user?.token || ''),
		enabled: !!user?.token,
	});

	if (!user) return <p className='text-red-500'>Please log in</p>;
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error.message}</p>;

	return (
		<div className='mt-8'>
			<h2 className='text-2xl font-bold mb-4'>Your Incomes</h2>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-gray-200'>
						<th className='p-2 border'>Description</th>
						<th className='p-2 border'>Amount</th>
						<th className='p-2 border'>Date</th>
						<th className='p-2 border'>Category</th>
						<th className='p-2 border'>Notes</th>
						<th className='p-2 border'>Source</th>
					</tr>
				</thead>
				<tbody>
					{incomes?.map((income: any) => (
						<tr key={income.id} className='border-b'>
							<td className='p-2'>{income.description}</td>
							<td className='p-2'>
								{format.currency}
								{income.amount
									.toFixed(format.decimals)
									.replace('.', format.separator)}
							</td>
							<td className='p-2'>{income.date}</td>
							<td className='p-2'>{income.category}</td>
							<td className='p-2'>{income.notes || '-'}</td>
							<td className='p-2'>{income.source || '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
			{incomes?.length === 0 && <p className='mt-4'>No incomes yet.</p>}
		</div>
	);
}
