import React from 'react'

function Button(props) {
  return (
    <button onClick={props.func} className="button">
     {props.title}
    </button>
  )
}

export default Button