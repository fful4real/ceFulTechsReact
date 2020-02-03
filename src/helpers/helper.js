export const numberWithCommas= x=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDateIfDate= d =>{
    var m = d.match(/\/Date\((\d+)\)\//);
    return m ? (new Date(+m[1])).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : d;
}

export const displayDate = d =>{
    
}

export const capitalizeFirstLetter = d =>{
    return d.charAt(0).toUpperCase() + d.slice(1)
}