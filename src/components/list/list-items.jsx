import React from 'react'
import DataTable from 'react-data-table-component'

const  ListItems = ({columns,data, isFetchingData, handleRowClick, expandableRows})=> {
    
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
                        progressPending={isFetchingData}
                        pagination={true}
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
