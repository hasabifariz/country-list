import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getByName } from '../../services/countries';

const CooperatingCountries = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')) || []);
  const [isShowed, setIsShowed] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toastError = (msg) => toast.error(msg, {
    position: "bottom-right"
  })
  const toastSuccess = (msg) => toast.success(msg, {
    position: "bottom-right"
  })

  useEffect(() => {
    const fetchData = async (name) => {
      setIsLoading(true);
      try {
        const result = await getByName(name);
        setData((prevData) => [...prevData, result?.[0]]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setData([]); // Clear previous data
    countries.forEach((item) => {
      fetchData(item);
    });
  }, [countries]);

  const handleRevoke = () => {
    try {
      const updatedCountries = countries.filter((item) => item !== selectedCountry);
      setCountries(updatedCountries);
      localStorage.setItem('countries', JSON.stringify(updatedCountries));
      setIsShowed(false);
      toastSuccess(`Your collaboration has been successfully revoked.`)
    } catch (err) {
      toastError(`Something wrong.`)
    }
  };

  const handleDialog = (name) => {
    setIsShowed(true);
    setSelectedCountry(name);
  };

  const addCountry = () => {
    navigate('/countries');
  };

  return (
    <div>
      <ToastContainer />
      <div className='p-4 mt-1'>
        <h1 className='text-3xl font-semibold pt-1 pl-2'>Cooperated Countries</h1>
        <div className='divider'></div>
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="table w-full table-sm">
              <thead>
                <tr>
                  <th className="w-[3%] text-[14px] text-slate-600" align='center'>No.</th>
                  <th className='text-[14px] text-slate-600'>Name</th>
                  <th className='text-[14px] text-slate-600'>Flag</th>
                  <th align='center' className='text-[14px] text-slate-600'>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td align='center' colSpan={4}>
                      <div className='flex flex-col items-center'>
                        <p className='text-sm font-semibold'>Fetching data, please wait...</p>
                        <span className="loading loading-dots loading-sm"></span>
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td align='center' colSpan={4}>
                      <p className='text-sm mb-2'>You haven't collaborated with any countries yet.</p>
                      <button onClick={addCountry} className='btn btn-sm bg-blue-500 hover:bg-blue-600 text-white'>
                        <span className='flex items-center'><Plus size={20} className='mr-2' />Add Country</span>
                      </button>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item?.name?.official}>
                      <td>{index + 1}</td>
                      <td>{item?.name?.official}</td>
                      <td>
                        <img src={item?.flags?.png} alt={item?.name?.official} width={35} height={35} />
                      </td>
                      <td align='center'>
                        <button onClick={() => handleDialog(item?.name?.official)} className='btn btn-xs bg-red-600 hover:bg-red-700 text-white text-xs px-4'>
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dialog Confirmation */}
      <dialog id="confirm-modal" className={`modal ${isShowed ? 'modal-open' : ''} w-full`}>
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Confirmation</h3>
          <p className="py-4">Are you sure you want to revoke cooperation with <strong>{selectedCountry}</strong>?</p>
          <div className="modal-action">
            <button className="btn btn-sm" onClick={() => setIsShowed(false)}>Cancel</button>
            <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white" onClick={handleRevoke}>
              Yes, I'm Sure
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CooperatingCountries;
