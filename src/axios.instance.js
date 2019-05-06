import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://development-71355.firebaseio.com/'
  });

export default instance;  

