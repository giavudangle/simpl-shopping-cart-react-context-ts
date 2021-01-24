import axios from 'axios';

const API_ENDPOINT : string = 'https://fakestoreapi.com'

export default axios.create({
    baseURL:API_ENDPOINT
});