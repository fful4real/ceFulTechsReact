import React, { Component } from 'react';

class PaginatorDefault extends Component {
    constructor(props){
        super(props)
        const {pageCount} = this.props
        this.range = []
        for (let i = 1; i <= pageCount; i++) {
           this.range.push(i)
        }
    }
    render() {
        const {currentPage, setPage, pageCount}=this.props
        return (
            <div className="col-sm">
            <nav className="pagination-wrap  justify-content-center mb-25" aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${currentPage===1?'disabled':''}`} onClick={()=>setPage(Math.max(1,currentPage-1))}>
                        <span className="page-link cursor-pointer">Prvious</span>
                    </li>
                    {this.range.map(page=>(
                        <li key={page} className={`page-item ${page===currentPage?'active':''}`}>
                            <span className="page-link cursor-pointer" onClick={()=>setPage(page)}>{page}</span>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage===pageCount?'disabled':''}`}>
                        <span className="page-link cursor-pointer" onClick={()=>setPage(Math.min(currentPage+1,pageCount))}>Next</span>
                    </li>
                </ul>
            </nav>
        </div>
        )
    }
}

export default PaginatorDefault;