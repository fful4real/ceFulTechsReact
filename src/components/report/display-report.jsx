import React from 'react'

export default function DisplayReport({title,value1,value2,subTitle,incrementValue, incrementClass}) {
    return (
        <div className="col-lg-3 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">{title}</span>
                            </div>
                            <div>
                                <span className={`text-${incrementClass} font-14 font-weight-500`}>{incrementValue}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">{value1}</span>
                            <small className="d-block"><span className="counter-anim">{value2}</span> {subTitle}</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}
