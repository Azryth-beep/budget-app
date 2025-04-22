import { useStore } from '../store'


function App() {

  const {format} = useStore();

  return (
    <>
    <div className='p-8 bg-gray-50'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Budget App</h1>
      <p className='text-gray-600 mb-6'>Formato: {format.currency}</p>
    </div>
    <div className='flex justify-center gap-4 p-4'>
      <a href="/login" className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>Login</a>
      <a href="/register" className='px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors'>Register</a>
    </div>
    </>
  )
}

export default App
