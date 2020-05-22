import moment from "moment";
import { FULTECHS_INITIAL_STATE } from "../redux/fultechs/FultechsReducer";

const globalItemsPerPage = FULTECHS_INITIAL_STATE.itemsPerPage
export const numberWithCommas= x=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDateIfDate= d =>{
    var m = d.match(/\/Date\((\d+)\)\//);
    return m ? (new Date(+m[1])).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : d;
}

export const formatDate = (d,key) =>{
    if(typeof d === 'object' && !Array.isArray(d)){
        return {...d, [key]:moment(d.datec).format("DD - MMM - YYYY")}
    }
    if(Array.isArray(d)){
        return d.map(dc=>({...dc, [key]:moment(dc.datec).format("DD - MMM - YYYY")}))
    }
}

export const capitalizeFirstLetter = (s) => {
    s=s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const sanitizeString = (str)=>{
    str = str.replace(/[^a-z0-9áéíóúñü: \\.,_-]/gim,"");
    return str.trim();
}

// Add attribute to an object or array of object
export const addAttribute = (arrayObj, attr, val)=>{
    if(typeof arrayObj === 'object' && !Array.isArray(arrayObj)){
        return {...arrayObj,[attr]:val}
    }
    if(Array.isArray(arrayObj)){
        return arrayObj.map(item=>({...item,[attr]:val}))
    }
}

// Paginate results

export const paginateResult = (result)=>{
        const itemsPerPage = FULTECHS_INITIAL_STATE.itemsPerPage
        let paginated = {}
        for (let i = 1; (result.length >= itemsPerPage*i)||(itemsPerPage*i-result.length < itemsPerPage); i++) {
            if (i===1) {
                paginated = {
                    ...paginated,
                    [`page_${i}`]: result.slice(0,itemsPerPage)
                }
            }else{
                paginated = {
                    ...paginated,
                    [`page_${i}`]: result.slice((i-1)*itemsPerPage, i*itemsPerPage)
                }
            }
        }
    
        return paginated
}

// Check if customer exists
export const customerExists = (cust, customers)=>{
    if (typeof cust === 'string') {
        return customers.find(customer=>customer.mobileNumber===cust)||
               customers.find(customer=>customer.id===parseInt(cust))?true:false
    }
    if(typeof cust === 'object'){
        return customers.find(customer=>customer.id===cust.id)?true:false
    }
    
    return false
}

// Check if customer email exists

export const customerEmailExists = (email, customers)=>{
    return customers.find(customer=>customer.email===email)?true:false
}

// Get total pages from hydra:total pages
export const getTotalPages = pageString =>{
        const totalPageStringLenth = pageString.length
        const indexOfValue = pageString.indexOf('=')+1
        
        return parseInt(pageString.substr(indexOfValue,totalPageStringLenth-indexOfValue))
        

}

// Get total pages and array of data
export const getPageCount = data =>{
    let dataLength = 1
    let pageCount = 1
    if (typeof data === 'string' || typeof data === 'number') {
        dataLength = parseInt(data)
    }
    if (Array.isArray(data)) {
        dataLength = data.length
    }
    if (dataLength<=globalItemsPerPage) {
        return pageCount
    }

    while (dataLength>globalItemsPerPage) {
        pageCount+=1
        dataLength-=globalItemsPerPage
    }
    return pageCount
}

// Get Account Entries
export const getAccountEntries = (account, accountEntries, isDebit)=>{
    return accountEntries.filter(accountEntry=>((accountEntry.ceAccount.id===account.id)&&(accountEntry.isDebit===isDebit))?true:false)
}

// Get Account Entries Amount
export const getAccountEntriesAmount = accountEntries=>{
    return accountEntries.reduce((amount, creditEntry)=>amount+=creditEntry.amount,0)
}

