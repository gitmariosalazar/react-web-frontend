
import axios from 'axios';

const url = "https://app-cent-mariosalazar.herokuapp.com"

export default class ProductService {

    getProductsSmall() {
        return axios.get('data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('data/products-orders-small.json').then(res => res.data.data);
    }

    getUsers(){
        return axios.get(url+'/users/get_users').then(res => res.data)
    }
}