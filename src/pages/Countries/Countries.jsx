import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/countries';
import { useNavigate } from 'react-router-dom';

const Countries = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await getAll();
        setData(result);
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  const handleDetail = (rowData) => {
    navigate('/countries/detail', { state: { name: rowData.name.official } })
  }

  return (
    <div>
      <div className='p-4  mt-1'>
        <h1 className='text-3xl font-semibold pt-1 pl-2'>Countries</h1>
        <div className='divider'></div>
        <div className=" overflow-x-auto ">
          <div className=" max-h-screen overflow-y-auto">
            <table className="table w-full lg:table-sm">
              <thead>
                <tr>
                  <th className='w-[3%]'>No.</th>
                  <th>Name</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading ?

                    <tr>
                      <td align='center' colSpan={3}>
                        <div className='flex flex-col items-center'>
                          <p className='text-sm font-semibold'>Fetching data, please wait...</p>
                          <span className="loading loading-dots loading-sm"></span>
                        </div>
                      </td>
                    </tr>

                    :
                    data?.map((item, index) => (
                      <tr key={item?.name?.official} className="hover:bg-slate-200 hover:cursor-pointer" onClick={() => handleDetail(item)}>
                        <td>{index + 1}</td>
                        <td>{item?.name?.official}</td>
                        <td>
                          <img src={item?.flags?.png} alt={item?.name?.official} width={35} height={35} />
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
