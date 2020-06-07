const BASE_URL = 'https://api.olhhs.com/'
const API_BASE_URL = BASE_URL+'api/'

export const ImageUrl = BASE_URL+'public/images/'

const API_ROUTES = {
    base_url: API_BASE_URL,
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
    images:id => id?`images/${id}?pagination=0`:'images?pagination=0',
    notifications:userId => userId?`notifications?notSeenBy=${userId}&pagination=0`:'notifications?pagination=0',
    statuses:id => id?`statuses/${id}`:'statuses',
    orders:id => id?`ce_orders/${id}`:'ce_orders',
}

export default API_ROUTES