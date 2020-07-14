import axios from 'axios';
const instance = axios.create({timeout: 20000});

instance.defaults.headers.common['User-Agent'] = 'unit-test';
export default instance;
