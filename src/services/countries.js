import axios from "axios";

export const getAll = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from', endpoint, error);
    throw error;
  }
};

export const getByName = async (name) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from', endpoint, error);
    throw error;
  }
};