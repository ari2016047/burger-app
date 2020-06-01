import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-app-38423.firebaseio.com/'
});

export default instance;