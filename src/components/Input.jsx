import React from 'react'
import cn from 'classnames'

import './Input.scss'

function Input({ className, outerRef, ...props }) {
  return (
    <input
      type="text"
      ref={outerRef}
      className={cn('input', className)}
      {...props}
    />
  )
}

export default Input
