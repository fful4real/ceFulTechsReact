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

