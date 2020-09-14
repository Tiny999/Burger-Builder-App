import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-2576f.firebaseio.com/'
});

export default instance;