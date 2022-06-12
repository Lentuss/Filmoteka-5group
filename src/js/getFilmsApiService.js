import axios from 'axios';
import { API_KEY } from './apiVariables';

export default class getFilmsApiService {
    constructor() {
        this.request = '';
        this.page = 1
    }

    getData({ data }) {
        this.incrementPage();
        return data;
    };

    async getFilms() {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Car&page=${this.page}`;
        const response = await axios(url);
        const data = await this.getData(response);
        return data;
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
    
    get req() {
        return this.request;
    }
}
