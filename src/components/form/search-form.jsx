import React from 'react'
import IosSearch from 'react-ionicons/lib/IosSearch'

export default function SearchForm({handleSearch,searchString='', searchPlaceHolder="Search"}) {
    
    return (
        <div className="d-flex align-items-center card-action-wrap">
            <form action="/" role="search" className="email-search search-form">
                <div className="input-group">
                    <input type="text" role="search" value={searchString} onChange={(e)=> handleSearch(e.target.value)} className="form-control" placeholder={searchPlaceHolder}/>
                    <div className="input-group-append">
                        <div className="feather-icon">
                            <IosSearch className="ion" color="#848d91" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
