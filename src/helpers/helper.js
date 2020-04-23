export const numberWithCommas= x=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDateIfDate= d =>{
    var m = d.match(/\/Date\((\d+)\)\//);
    return m ? (new Date(+m[1])).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : d;
}

export const displayDate = d =>{
    
}

export const capitalizeFirstLetter = (s) => {
    s=s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const sanitizeString = (str)=>{
    str = str.replace(/[^a-z0-9áéíóúñü: \\.,_-]/gim,"");
    return str.trim();
}