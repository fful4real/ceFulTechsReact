const BASE_URL = 'htthttp://127.0.0.1:8000/api';

const API_ROUTES = {
    base_url: BASE_URL,
    login:`login_check`,
    user: id=>id?`users/${id}`:'users',
    customers:id => id?`customers/${id}`:'customers'
}

export default API_ROUTES