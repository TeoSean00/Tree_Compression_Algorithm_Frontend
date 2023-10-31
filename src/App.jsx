import { useState } from 'react'
import './index.css';
import BackendService from './services/Backend';
import Loading from './components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(false)
  const [selectedAlgorithm1, setSelectedAlgorithm1] = useState('Original Bad Algorithm');
  const [selectedAlgorithm2, setSelectedAlgorithm2] = useState('Huffman Algorithm');
  const [algorithmResult, setAlgorithmResult] = useState(null);

  const algorithmOptions = [
    { value: 'Original Bad Algorithm', label: 'Original Bad Algorithm' },
    { value: 'Huffman Algorithm', label: 'Huffman Algorithm' },
    { value: 'Colour Quant and Huffman Algorithm - Quant 256', label: 'Colour Quant and Huffman Algorithm - Quant 256' },
    { value: 'Colour Quant and Huffman Algorithm - Quant 512', label: 'Colour Quant and Huffman Algorithm - Quant 512' },
    { value: 'Colour Quant and Huffman Algorithm - String Array', label: 'Colour Quant and Huffman Algorithm - String Array' },
    { value: 'Image Dithering and Huffman Algorithm', label: 'Image Dithering and Huffman Algorithm' },
  ]

  const handleRunAlgorithms = () => {
    if (selectedAlgorithm1 === selectedAlgorithm2) {
      toast.error("Please select two different algorithms to compare!");
      return;
    }
    console.log("frontend sent over request:", selectedAlgorithm1, selectedAlgorithm2);
    setLoading(true);
    BackendService.getAlgorithms(selectedAlgorithm1, selectedAlgorithm2).then((response) => {
      setLoading(false);
      toast.success("Successfully ran both algorithms!");
      console.log(response.data);
      setAlgorithmResult(response.data);
    }).catch((error) => {
      console.error("Error from the backend:", error);
      setLoading(false);
    });
  }

  const handleSampleAlgorithm = () => {
    BackendService.getSampleAlgorithm().then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error("Error from the backend:", error);
    });
  }

  return (
    <div className='flex flex-col h-screen w-screen '>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
      />

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
            <div className='text-black font-medium text-xl text-decoration-line: underline'>
              {selectedAlgorithm1 ? selectedAlgorithm1 : 'Algorithm 1'}
            </div>
            {/* result state */}
            {algorithmResult && (
              <div className='flex flex-grow flex-col justify-start items-center'>
                <div className='mt-4 text-black font-medium'>
                {Object.keys(algorithmResult[selectedAlgorithm1]).map((imageName, imageIndex) => (
                  <div key={imageIndex} className='mt-4 py-1 px-2 border-2 border-slate-300'>
                    <div className='text-lg text-blue-700 mb-0.5'>
                      {imageName}
                    </div>
                    <div className='text-md'>
                      {algorithmResult[selectedAlgorithm1][imageName].map((data, dataIndex) => (
                        <div key={dataIndex} className='p-0.5'>
                          {data}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
            {/* loading state */}
            {loading && (
              <div className='flex flex-grow flex-col justify-center items-center'>
                <Loading />
                <div className='mt-6 font-medium text-md text-black'>
                  Please refer to the backend terminal for more detailed logs.
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Algorithm 2 */}
        <div className='flex flex-grow basis-1/2 justify-center border-2 border-slate-400 p-4'>
          <div className='flex flex-col text-center items-center'>
            <div className='text-black font-medium text-xl text-decoration-line: underline'>
              {selectedAlgorithm2 ? selectedAlgorithm2 : 'Algorithm 2'}
            </div>
            {/* result state */}
            {algorithmResult && (
              <div className='flex flex-grow flex-col justify-start items-center'>
                <div className='mt-4 text-black font-medium'>
                {Object.keys(algorithmResult[selectedAlgorithm2]).map((imageName, imageIndex) => (
                  <div key={imageIndex} className='mt-4 py-1 px-2 border-2 border-slate-300'>
                    <div className='text-lg text-blue-700 mb-0.5'>
                      {imageName}
                    </div>
                    <div className='text-md'>
                      {algorithmResult[selectedAlgorithm2][imageName].map((data, dataIndex) => (
                        <div key={dataIndex} className='p-0.5'>
                          {data}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
            {/* loading state */}
            {loading && (
              <div className='flex flex-grow flex-col justify-center items-center'>
                <Loading />
                <div className='mt-6 font-medium text-md text-black'>
                  Please refer to the backend terminal for more detailed logs.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
