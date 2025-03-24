import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/backend',
});

// za da se dobie todo
export const getTodos = async () => {
    const response = await api.get('/todos', { withCredentials: true });
    return response.data;
};

// za da se napraj novo todo 
export const createTodo = async (todo) => {
    const response = await api.post('/todos', todo, { withCredentials: true });
    return response.data;
};


export default api;
