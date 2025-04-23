import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store';

const fetchExpenses = async (token: string) => {
  const response = await fetch('http://localhost:3000/api/expenses', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch expenses');
  return response.json();
};

export default function ExpenseTable() {
  const { user, format } = useStore();
  const { data: expenses, error, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => fetchExpenses(user?.token || ''),
    enabled: !!user?.token,
  });

  if (!user) return <p className="text-red-500">Please log in</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Payment Method</th>
            <th className="p-2 border">Notes</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense: any) => (
            <tr key={expense.id} className="border-b">
              <td className="p-2">{expense.category}</td>
              <td className="p-2">
                {format.currency}
                {expense.amount.toFixed(format.decimals).replace('.', format.separator)}
              </td>
              <td className="p-2">{expense.date}</td>
              <td className="p-2">{expense.payment_method}</td>
              <td className="p-2">{expense.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses?.length === 0 && <p className="mt-4">No expenses yet.</p>}
    </div>
  );
}