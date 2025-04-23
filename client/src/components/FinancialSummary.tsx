import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store';

const fetchIncomes = async (token: string) => {
  const response = await fetch('http://localhost:3000/api/incomes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch incomes');
  return response.json();
};

const fetchExpenses = async (token: string) => {
  const response = await fetch('http://localhost:3000/api/expenses', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch expenses');
  return response.json();
};

export default function FinancialSummary() {
  const { user, format } = useStore();

  const incomesQuery = useQuery({
    queryKey: ['incomes'],
    queryFn: () => fetchIncomes(user?.token || ''),
    enabled: !!user?.token,
  });

  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: () => fetchExpenses(user?.token || ''),
    enabled: !!user?.token,
  });

  if (!user) return <p className="text-red-500">Please log in</p>;
  if (incomesQuery.isLoading || expensesQuery.isLoading) return <p>Loading...</p>;
  if (incomesQuery.error || expensesQuery.error) {
    const error = incomesQuery.error || expensesQuery.error;
    return <p className="text-red-500">{error?.message}</p>;
  }

  const incomes = incomesQuery.data || [];
  const expenses = expensesQuery.data || [];

  const totalIncomes = incomes.reduce((sum: number, income: any) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const formatAmount = (amount: number) =>
    `${format.currency}${amount.toFixed(format.decimals).replace('.', format.separator)}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Financial Summary</h2>
      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold">Total Incomes:</span>{' '}
          <span className="text-green-600">{formatAmount(totalIncomes)}</span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Total Expenses:</span>{' '}
          <span className="text-red-600">{formatAmount(totalExpenses)}</span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Balance:</span>{' '}
          <span className={balance >= 0 ? 'text-green-600' : 'text-red-600'}>
            {formatAmount(balance)}
          </span>
        </p>
      </div>
    </div>
  );
}