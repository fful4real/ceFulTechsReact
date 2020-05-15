import React from 'react'
import DataTable from 'react-data-table-component'

const  ListItems = ({columns,data, pagination=false, isFetchingData, handleRowClick, expandableRows})=> {
    
    return (
        <div className="row">
            <div className="col-sm">
                <div className="table-wrap" id="orderTable">
                    <DataTable
                        columns={columns}
                        data={data}
                        highlightOnHover={true}
                        striped={true}
                        pointerOnHover={true}
                        responsive={true}
                        progressPending={isFetchingData?true:false}
                        pagination={pagination?pagination:false}
                        when={row=>alert(row)}
                        fixedHeader={true}
                        fixedHeaderScrollHeight="100vh"
                        expandableRows={expandableRows?true:false}
                        onRowClicked={handleRowClick&&handleRowClick}
                    />
                </div>
            </div>
        </div>            
    )
}

export default ListItems
