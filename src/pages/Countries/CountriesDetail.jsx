import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getByName } from '../../services/countries';
import { ChevronLeft } from 'lucide-react';

const CountriesDetail = () => {

  const [data, setData] = useState(null);
  console.log("🚀 ~ CountriesDetail ~ data:", data)
  const navigate = useNavigate()
  const location = useLocation()
  const name = location?.state?.name;
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await getByName(name);
        setData(result?.[0]);
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='p-4 card shadow-lg bg-slate-50 mt-1'>
        <div className='flex items-center'>
          <button className='btn btn-ghost' onClick={() => navigate('/countries')}> <ChevronLeft /></button>
          <h1 className='text-xl font-semibold pt-1 pl-2'>{data?.name?.official}</h1>
        </div>
        <div className='divider'></div>
      </div>
    </div>
  )
}

export default CountriesDetail