import { useStore } from '../store'


function App() {

  const {format} = useStore();

  return (
    <>
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Budget App</h1>
      <p>Formato: {format.currency}</p>
    </div>
    </>
  )
}

export default App
