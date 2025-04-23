import { Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import IncomeForm from '../components/IncomeForm';
import IncomeTable from '../components/IncomeTable';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import FinancialSummary from '../components/FinancialSummary';

export default function Dashboard() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  if (!user?.token) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <FinancialSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Incomes</h2>
          <IncomeForm />
          <IncomeTable />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          <ExpenseForm />
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
}