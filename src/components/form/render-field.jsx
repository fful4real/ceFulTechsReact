import React, { Fragment } from 'react'

export default function RenderField({input, label, type, className, placeholder, meta:{error}, disabled}) {
    return (
        <Fragment>
            <input {...input} disabled={disabled} className={className} placeholder={placeholder}
                type={type}
            />
        </Fragment>
    )
}
