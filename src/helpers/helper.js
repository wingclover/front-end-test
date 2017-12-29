import axios from 'axios';

export const PIZZA_URL = 'pizza.json'
export const fetchPizza = () => {
    return axios.get(PIZZA_URL)  
};