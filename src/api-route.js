const BASE_URL = 'htthttp://127.0.0.1:8000/api';

const API_ROUTES = {
    base_url: BASE_URL,
    login:`login_check`,
    user: id=>id?`users/${id}`:'users',
    customers:id => id?`customers/${id}`:'customers',
    customerNumber:number => `customers?mobileNumber=${number}`,
    currencies:id => id?`currencies/${id}`:'currencies',
    cities:id => id?`cities/${id}`:'cities',
    orders:id => id?`ce_orders/${id}`:'ce_orders',
}

export default API_ROUTES