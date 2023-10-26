import { useState } from 'react'
import './index.css';
import BackendService from './services/Backend';
import Loading from './components/Loading';

function App() {
  const [healthCheck, setHealthCheck] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleBackendHealthCheck = async () => {
    try {
      const results = await BackendService.getBackendCheck();
      setHealthCheck(results);
    } catch (error) {
      console.error("Error from the backend:", error);
    }
  };

  const handleRunAlgorithms = () => {
    setLoading(!loading);
  }


  return (
    <div className='flex flex-col h-screen w-screen bg-slate-200'>
      {/* Navbar section */}
      <nav className="bg-blue-700 p-3 w-full mx-auto items-center">
        <div className="text-white items-center text-center text-xl font-medium px-5 py-2 mr-2 mb-2">Data Structures and Algorithms Project - Tree Compression Algorithm - G4T2</div>
      </nav>
      
      {/* Button section */}
      <div className='flex flex-row items-center justify-center gap-4 mt-16 mb-16'>
        <div>
          <button
            onClick={handleRunAlgorithms}
            type="button"
            className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Run Algorithms
          </button>
        </div>
        {/* backend health check */}
        <div>
          <button
            onClick={handleBackendHealthCheck}
            type="button"
            className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Call Backend Test
          </button>
        </div>
        {healthCheck && (
            <div>
              <div className="text-black text-center text-sm font-medium">Backend response: {healthCheck.data}</div>
            </div>
          )}
      </div>

      {/* Algorithm section */}
      <div className='flex flex-row justify-between flex-grow'>
        {/* Original Algorithm */}
        <div className='flex flex-grow justify-center border-2 border-slate-400 p-6'>
          <div className='flex flex-col text-center items-center'>
            <div className='text-black font-medium text-xl'>
              Original Algorithm
            </div>
            {loading && (
            <div className='flex flex-grow justify-center items-center'>
              <Loading />
            </div>
            )}
          </div>
        </div>
        {/* Optimized Algorithm */}
        <div className='flex flex-grow justify-center border-2 border-slate-400  p-6'>
          <div className='flex flex-col text-center items-center'>
            <div className='text-black font-medium text-xl'>
              Optimized Algorithm
            </div>
            {loading && (
            <div className='flex flex-grow justify-center items-center'>
              <Loading />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
