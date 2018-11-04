import React from 'react'
import './Checkbox.scss'

function Checkbox({ type, style, children, ...props }) {
  return (
    <label className="checkbox-label">
      <input type="checkbox" {...props} />
      <span style={style} className="label">
        {children}
      </span>
    </label>
  )
}

export default Checkbox
