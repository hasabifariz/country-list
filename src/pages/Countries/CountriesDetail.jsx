import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getByName } from '../../services/countries';
import { ChevronLeft, MapPin, Users, Globe, DollarSign, Flag, SquareArrowOutUpRight, Plus } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountriesDetail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = location?.state?.name;

  const toastError = (msg) => toast.error(msg)
  const toastSuccess = (msg) => toast.success(msg)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getByName(name);
        setData(result?.[0]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [name]);

  const handleCollaboration = () => {
    let countries = JSON.parse(localStorage.getItem('countries')) || [];
    const newCountry = data.name.official;

    if (countries.includes(newCountry)) {
      toastError(`${newCountry} already exists in the list!`)
      setIsShowed(false)
    } else {
      const success = Math.random() > 0.5;
      if (success) {
        countries.push(newCountry);

        localStorage.setItem('countries', JSON.stringify(countries));
        setIsShowed(false)
        toastSuccess(`Collaboration succeeded! ${newCountry} has been added to the list.`)
      } else {
        toastError(`Collaboration failed. Try again!`)
        setIsShowed(false)
      }
    }
  };

  if (isLoading) return (
    <div className='flex flex-col items-center'>
      <p className='text-sm font-semibold'>Fetching data, please wait...</p>
      <span className="loading loading-dots loading-sm"></span>
      <button className='btn px-7 btn-sm'>Cancel</button>
    </div>
  );
  if (!data) return (
    <div>
      <p className="text-center mt-4">No data available</p>
      <a href="/countries" className="text-blue-500 text-center">Back</a>
    </div>
  )

  return (
    <div className="w-full p-2">
      <ToastContainer />
      <div className='bg-base-200 shadow-lg rounded-lg p-8 max-w-7xl mx-auto relative'>
        <div className="absolute top-2 md:top-4 left-2 md:left-4">
          <button className="text-gray-600 hover:text-gray-900 btn btn-circle btn-sm" onClick={() => navigate('/countries')}>
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className='flex items-center justify-center w-full mb-10'>
          <h1 className="text-2xl font-bold text-gray-800 ml-4 text-center">{data.name.official}</h1>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <img src={data.flags.png} alt={`${data.name.common} flag`} className="w-3/4 h-auto rounded-lg shadow-md mb-4" />
            <p className="text-lg font-semibold text-gray-700">({data.name.common})</p>
            <a
              href={data.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-blue-400 transition duration-200 text-sm"
            >
              <span className='flex items-center' style={{ fontFamily: "'Roboto', sans-serif" }}>
                <SquareArrowOutUpRight size={10} className='mr-2' />View on Google Maps
              </span>
            </a>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-500" />
                <p><strong>Capital:</strong> {data.capital?.[0]}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Users size={20} className="text-green-500" />
                <p><strong>Population:</strong> {data.population.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={20} className="text-yellow-500" />
                <p><strong>Languages:</strong> {Object.values(data.languages).join(', ')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign size={20} className="text-red-500" />
                <p>
                  <strong>Currency: </strong>
                  {Object.values(data.currencies || {})[0]?.name + ' '}
                  (<strong>{Object.values(data.currencies || {})[0]?.symbol}</strong>)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Flag size={20} className="text-purple-500" />
                <p><strong>Independent:</strong> {data.independent ? "Yes" : "No"}</p>
              </div>
            </div>
            <p className='text-sm text-justify'>{data?.flags?.alt}</p>
          </div>
        </div>
      </div>

      {/* Collab Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsShowed(true)}
          className="bg-blue-500 px-6 py-3 rounded-full shadow-lg text-white hover:bg-blue-600 transition hidden md:block"
        >
          <span className='flex items-center justify-center'>
            <Plus size={20} className='mr-4' /> Offer Collaboration
          </span>
        </button>
        <button
          onClick={() => setIsShowed(true)}
          className="md:hidden  bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-blue-600 transition"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Dialog Confirmation */}
      <dialog id="confirm-modal" className={`modal ${isShowed ? 'modal-open' : ''} w-full`}>
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Confirmation</h3>
          <p className="py-4">Do you wish to collaborate with this country?</p>
          <div className="modal-action">
            <button className="btn btn-sm" onClick={() => setIsShowed(false)}>Cancel</button>
            <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCollaboration}>
              Yes
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default CountriesDetail;