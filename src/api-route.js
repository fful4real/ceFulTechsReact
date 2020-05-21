const BASE_URL = 'http://127.0.0.1:8000/api/'

const API_ROUTES = {
    base_url: BASE_URL,
    login:`login_check`,
    user: id=>id?`users/${id}`:'users',
    customers:id => id?`customers/${id}`:'customers',
    customerNumber:number => `customers?mobileNumber=${number}`,
    orderItemOrderEntries:orderIdApiRoute => `order_entries?ceOrder=${orderIdApiRoute}`,
    currencies:id => id?`currencies/${id}`:'currencies',
    accounts:id => id?`ce_accounts/${id}`:'ce_accounts',
    accountTypes:id => id?`account_types/${id}`:'account_types',
    cities:id => id?`cities/${id}`:'cities',
    banks:id => id?`banks/${id}`:'banks',
    statuses:id => id?`statuses/${id}`:'statuses',
    orders:id => id?`ce_orders/${id}`:'ce_orders',
}

export default API_ROUTES