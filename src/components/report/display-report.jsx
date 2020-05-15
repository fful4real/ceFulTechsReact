import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function DisplayReport({displayClassName="col-lg-3 col-md-6",title,value1,value2,subTitle,incrementValue, incrementClass, linkTo}) {
    const [redirectPage, setrediRectPage] = useState('')
    return redirectPage?
        <Redirect to={redirectPage} /> : (
        <div className={displayClassName}>
                <div className="card card-sm">
                    <div className={`card-body${linkTo?" cursor-pointer shadow-hover":''}`} onClick={()=>setrediRectPage(linkTo)}>
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
