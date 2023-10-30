import { useState } from 'react'
import './index.css';
import BackendService from './services/Backend';
import Loading from './components/Loading';

function App() {
  const [healthCheck, setHealthCheck] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedAlgorithm1, setSelectedAlgorithm1] = useState('Huffman Algorithm');
  const [selectedAlgorithm2, setSelectedAlgorithm2] = useState('Colour Quant Algorithm');

  const algorithmOptions = [
    { value: 'Original Bad Algorithm', label: 'Original Bad Algorithm' },
    { value: 'Huffman Algorithm', label: 'Huffman Algorithm' },
    { value: 'Colour Quant and Huffman Algorithm - Quant 256', label: 'Colour Quant and Huffman Algorithm - Quant 256' },
    { value: 'Colour Quant and Huffman Algorithm - Quant 512', label: 'Colour Quant and Huffman Algorithm - Quant 512' },
    { value: 'Colour Quant and Huffman Algorithm - String Array', label: 'Colour Quant and Huffman Algorithm - String Array' },
    { value: 'Image Dithering and Huffman Algorithm', label: 'Image Dithering and Huffman Algorithm' },
  ]

  const handleRunAlgorithms = () => {
    // console.log(selectedAlgorithm1, selectedAlgorithm2);
    // BackendService.getBackendCheck(selectedAlgorithm1, selectedAlgorithm2).then((response) => {
    //   console.log(response.data);
    // }).catch((error) => {
    //     console.error("Error from the backend:", error);
    // });
    console.log("frontend sent over request:", selectedAlgorithm1, selectedAlgorithm2);
    setLoading(true);
    BackendService.getAlgorithms(selectedAlgorithm1, selectedAlgorithm2).then((response) => {
      setLoading(false);
      console.log(response.data);
    }).catch((error) => {
      console.error("Error from the backend:", error);
      setLoading(false);
    });
  }

  return (
    <div className='flex flex-col h-screen w-screen bg-slate-200'>
      {/* Navbar section */}
      <nav className="bg-blue-700 p-1 w-full mx-auto items-center">
        <div className="text-white items-center text-center text-xl font-medium px-5 py-2 mr-2 mb-2">Data Structures and Algorithms Project - Tree Compression Algorithm - G4T2</div>
      </nav>

      {/* Form section */}
      <div className='flex flex-col items-center justify-center gap-3 mt-5 mb-5'>
        {/* Dropdown 1 */} 
        <div>
          <label htmlFor="algorithm1" className="block text-black font-medium text-sm mb-1">Algorithm 1:</label>
          <select
            onChange={(option) => setSelectedAlgorithm1(option.target.value)}
            value={selectedAlgorithm1}
            id="algorithm1"
            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 w-96 focus:outline-none"
          >
            {(algorithmOptions).map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* Dropdown 2 */}
        <div>
          <label htmlFor="algorithm2" className="block text-black font-medium text-sm mb-1">Algorithm 2:</label>
          <select
            onChange={(option) => setSelectedAlgorithm2(option.target.value)}
            value={selectedAlgorithm2}
            id="algorithm2"
            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 w-96 focus:outline-none"
          >
            {(algorithmOptions).map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* Run Algorithms Button */}
        <div>
          <button
            onClick={handleRunAlgorithms}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 w-96 focus:outline-none"
          >
            Run Algorithms
          </button>
        </div>
      </div>

      {/* Algorithm section */}
      <div className='flex flex-row justify-between flex-grow'>
        {/* Algorithm 1 */}
        <div className='flex flex-grow basis-1/2 justify-center border-2 border-slate-400 p-4'>
          <div className='flex flex-col text-center items-center'>
            <div className='text-black font-medium text-xl'>
              {selectedAlgorithm1 ? selectedAlgorithm1 : 'Algorithm 1'}
            </div>
            {loading && (
            <div className='flex flex-grow justify-center items-center'>
              <Loading />
            </div>
            )}
          </div>
        </div>
        {/* Algorithm 2 */}
        <div className='flex flex-grow basis-1/2 justify-center border-2 border-slate-400 p-4'>
          <div className='flex flex-col text-center items-center'>
            <div className='text-black font-medium text-xl'>
              {selectedAlgorithm2 ? selectedAlgorithm2 : 'Algorithm 2'}
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
