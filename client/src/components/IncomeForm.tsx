import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useStore } from '../store';

const incomeSchema = z.object({
	description: z.string().min(1, 'Description is required'),
	amount: z.number().positive('Amount must be positive'),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
	category: z.enum(['Salario', 'Freelancing'], { message: 'Invalid category' }),
	notes: z.string().optional(),
	source: z.string().optional(),
});

const createIncome = async (data: any, token: string) => {
	const response = await fetch('http://localhost:3000/api/incomes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to create income');
	return response.json();
};

export default function IncomeForm() {
	const { user } = useStore();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (data: any) => createIncome(data, user?.token || ''),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['incomes'] });
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			description: formData.get('description'),
			amount: Number(formData.get('amount')),
			date: formData.get('date'),
			category: formData.get('category'),
			notes: formData.get('notes') || undefined,
			source: formData.get('source') || undefined,
		};
		try {
			incomeSchema.parse(data);
			mutation.mutate(data);
		} catch (error) {
			console.error(error);
		}
	};

	if (!user) return <p className='text-red-500'>Please log in</p>;

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto p-4 bg-white shadow-md rounded'
		>
			<h2 className='text-2xl font-bold mb-4'>Add Income</h2>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Description</label>
				<input
					name='description'
					type='text'
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Amount (RD$)</label>
				<input
					name='amount'
					type='number'
					step='0.01'
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Date</label>
				<input
					name='date'
					type='date'
					className='w-full p-2 border rounded'
					required
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Category</label>
				<select name='category' className='w-full p-2 border rounded' required>
					<option value='Salario'>Salario</option>
					<option value='Freelancing'>Freelancing</option>
				</select>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Notes</label>
				<textarea name='notes' className='w-full p-2 border rounded' />
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium'>Source</label>
				<input
					name='source'
					type='text'
					className='w-full p-2 border rounded'
				/>
			</div>
			{mutation.isError && (
				<p className='text-red-500'>{mutation.error.message}</p>
			)}
			<button
				type='submit'
				className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
				disabled={mutation.isPending}
			>
				{mutation.isPending ? 'Adding...' : 'Add Income'}
			</button>
		</form>
	);
}
