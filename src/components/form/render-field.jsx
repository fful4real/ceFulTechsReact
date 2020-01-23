import React, { Fragment } from 'react'

export default function RenderField({input, label, type, className, placeholder, meta:{error}, disabled, required=true}) {
    return (
        <Fragment>
            <input {...input} required={true} disabled={disabled} className={className} placeholder={placeholder}
                type={type}
            />
        </Fragment>
    )
}
