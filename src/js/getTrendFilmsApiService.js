// import axios from 'axios';
import { API_KEY, BASE_URL, TREND_URL } from './apiVariables';

export default class getFilmsApiService {
    constructor() {
        this.page = 1
    }

    getData({ data }) {
        this.incrementPage();
        return data;
    };

    async getFilms() {
        const url = `${TREND_URL}?api_key=${API_KEY}&page=${this.page}`;
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
}
