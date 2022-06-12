import axios from 'axios';
import { API_KEY, SEARCH_URL } from "./apiVariables";

export default class MovieApiServise {
    constructor() {
        this.searchRequest = "";
        this.page = 1;
    }

    async movieSearch() {
        try {              
            const fetchRequest = await axios.get(`${SEARCH_URL}`, {
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