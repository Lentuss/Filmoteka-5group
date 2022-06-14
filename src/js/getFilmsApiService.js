import axios from 'axios';
import { API_KEY} from './apiVariables';

export default class getFilmsApiService {
    constructor(url) {
        this.searchRequest = "";
        this.page = 1;
        this.url = url;
    }

    getData({ data }) {
        this.incrementPage();
        return data;
    };

    async getFilms() {
        try {
            const fetchRequest = await axios.get(`${this.url}`, {
                    params: {
                        api_key: API_KEY,
                        query: this.searchRequest,
                        page: this.page,                    
                    }
            });
            
            // const response = await axios(url);
            const data = await this.getData(fetchRequest);
            return data;
                
        } catch (error) {
            console.log(error.message);  
        }        
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchRequest;
    }

    set query(newQuery) {
        this.searchRequest = newQuery;
    }
}
