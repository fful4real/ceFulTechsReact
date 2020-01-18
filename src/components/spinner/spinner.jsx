import React from 'react'
import {SpinnerContainer} from './spinner.style'

export default function Spinner() {
    return (
        <div className="text-center card-refresh">
            <SpinnerContainer>
                <div className="loader-pendulums"></div>
            </SpinnerContainer>
        </div>
    )
}
