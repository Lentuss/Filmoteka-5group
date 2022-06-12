import axios from 'axios';
import { API_KEY } from "./apiVariables";

export default class MovieApiServise {
    constructor(url) {
        this.searchRequest = "";
        this.page = 1;
        this.url = url;
    }

    async movieSearch() {
        try {              
            const fetchRequest = await axios.get(`${this.url}`, {
                params: {
                    api_key: API_KEY,
                    query: this.searchRequest,
                    page: this.page,                    
                }
            });
            
            const response = await fetchRequest.data;
            
            return response;              
                
        } catch (error) {
            console.log(error.message);
        }      
}

resetPage() {
    this.page = 1;
}
    get query() {
        return this.searchRequest;
    }

    set query(newQuery) {
        this.searchRequest = newQuery;
    }
}