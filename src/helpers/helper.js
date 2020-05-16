import moment from "moment";

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

export const paginateResult = (result, perpage)=>{
    
        let paginated = {}
        for (let i = 1; (result.length >= perpage*i)||(perpage*i-result.length < 10); i++) {
            if (i===1) {
                paginated = {
                    ...paginated,
                    [`page_${i}`]: result.slice(0,10)
                }
            }else{
                paginated = {
                    ...paginated,
                    [`page_${i}`]: result.slice((i-1)*perpage, i*perpage)
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

