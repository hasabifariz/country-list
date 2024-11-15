import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAll } from '../../services/countries';


const Countries = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const toastError = (msg) => toast.error(msg, {
    position: "bottom-right"
  })
  const toastSuccess = (msg) => toast.success(msg, {
    position: "bottom-right"
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getAll();
        setData(result);
        toastSuccess('Data retrieved successfully.')
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        toastError(`Failed to retrieve data. Error : ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetail = (rowData) => {
    navigate('/countries/detail', { state: { name: rowData.name.common } });
  };

  return (
    <div>
      <div className="p-2 mt-1">
        <ToastContainer />
        <h1 className="text-3xl font-semibold  pl-2">Countries</h1>
        <div className="divider"></div>
        <div className="overflow-x-auto shadow-md rounded-md">
          <div className="overflow-y-auto max-h-[70vh] rounded-lg bg-slate-50 px-4 py-3">
            <table className="table w-full lg:table-sm ">
              <thead>
                <tr>
                  <th className="w-[3%] text-[14px] text-slate-600" align='center'>No.</th>
                  <th className='text-[14px] text-slate-600'>Name</th>
                  <th className='text-[14px] text-slate-600'>Flag</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td align="center" colSpan={3}>
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold">Fetching data, please wait...</p>
                        <span className="loading loading-dots loading-sm"></span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((item, index) => (
                    <tr
                      key={item?.name?.official}
                      className="hover:bg-slate-200 hover:cursor-pointer"
                      onClick={() => handleDetail(item)}
                    >
                      <td align='center'>{index + 1}</td>
                      <td >{item?.name?.official}</td>
                      <td>
                        <img
                          src={item?.flags?.png}
                          alt={item?.name?.official}
                          width={35}
                          height={35}
                          className="border border-black"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
