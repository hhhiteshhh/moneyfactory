import axios from '../components/axios';

const GetApi = async (url) => {

  const result = await axios.get(url);
  return result;
 
};

export default GetApi;
