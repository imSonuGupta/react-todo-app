import type { Item } from '@/models/items';
import axios, {Axios} from 'axios';

class TodoService {
    private apiInstance: Axios;
    constructor() {
        this.apiInstance = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com/todos/',
            responseType: 'json'
        });
    }

    public async getTodoItemById(id: string): Promise<Item> {
        const { data } = await this.apiInstance.get<Item>(id);
        await new Promise(resolve => setTimeout(resolve, 300));
        return data; 
    }
}

export default new TodoService()    