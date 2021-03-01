import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

const Alert = ({
  outlined = false,
  raised = false,
  rounded = false,
  borderLeft = false,
  icon = null,
  size = 'default',
  color,
  children
}) => {
  const [hidden, setHidden] = useState(false)
  const css = []
  css.push(color)
  if (outlined) css.push('border border-current')
  if (raised) css.push('shadow')
  if (rounded) css.push('rounded-lg')
  if (hidden) css.push('hidden')
  if (borderLeft) css.push('border-l-4 border-current')
  if (size === 'sm') {
    css.push('p-2')
  } else {
    css.push('p-4')
  }

  const cssF = css.join(' ')

  return (
    <div className={`w-full flex items-center justify-start p-4 ${cssF}`}>
      <div className="flex-shrink">{icon}</div>
      <div className="flex-grow">{children}</div>
      <div className="flex-shrink">
        <button
          className="ml-auto flex items-center justify-center"
          onClick={() => setHidden(!hidden)}
        >
          <FiX className="stroke-current h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

Alert.propTypes = {
  color: PropTypes.string,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.any,
  children: PropTypes.any
}

export default Alert
