import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-app-38423.firebaseio.com/',
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    // }
});

export default instance;