import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { uid } from "react-uid";


const FulTechsTooltip = ({tooltipMessage="Enter tooltip message", children, position="top"}) => {
  const myTooltip = (
  <Tooltip id={`"ftTooltip-${uid(tooltipMessage)}`}>
    <span>{tooltipMessage}</span>
  </Tooltip>)

  return (
      <OverlayTrigger placement={position} overlay={myTooltip}>
        {children}
      </OverlayTrigger>
  )
}

export default FulTechsTooltip
