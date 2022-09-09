import React from 'react'

function Alert(props) {
  return (
    <div style={{height: '50px'}}>
    {props.alert && <div className={`px-4 z-50 py-2 font-bold text-sm ${props.alert.bgColor} ${props.alert.textColor}`} role="alert">
        <span className="font-medium">{props.alert.msgType}  :  </span>{props.alert.msg}
    </div>}
    </div>
  )
}

export default Alert
