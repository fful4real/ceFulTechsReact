import React from 'react'
import {SpinnerContainer} from './spinner.style'

export default function Spinner({spinnerHeight='71px', spinnerFontSize='1.5em',spinnerRight='44%'}) {
    return (
        <div className="text-center card-refresh">
            <SpinnerContainer style={{minHeight:spinnerHeight}}>
                <div className="loader-pendulums" style={{fontSize:spinnerFontSize, right:spinnerRight}}></div>
            </SpinnerContainer>
        </div>
    )
}
