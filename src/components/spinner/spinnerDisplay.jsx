import React from 'react'
import Spinner from './spinner'

export default function SpinnerDisplay({title}) {
    return (
        <div className="col-lg-3 col-md-6">
            <div className="card card-sm">
                <div className="card-body position-relative">
                    <div className="d-flex justify-content-between mb-5">
                        <div>
                            <span className="d-block font-15 text-dark font-weight-500">{title}</span>
                        </div>
                        <div>
                            <span className="text-grey font-14 font-weight-500">loading....</span>
                        </div>
                    </div>
                    <Spinner/>
                </div>
            </div>
        </div>
    )
}
