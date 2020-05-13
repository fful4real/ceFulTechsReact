import React from 'react'

const RefreshPage = ({reloading, reload})=>{

    return (
        reloading?<small className="text-success position-absolute header-reloading">refreshing...</small>
                        :<small className="text-muted position-absolute header-reloading cursor-pointer" style={{right: "-34px"}} onClick={()=>reload()}>refresh</small>
    )
}

export default RefreshPage
