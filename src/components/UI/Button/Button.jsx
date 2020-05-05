import React from 'react'
import styles from './Button.module.scss'

const Button = props => {
  const classes = [
    styles.Button,
    styles[props.type],
  ]
  return (
    <button
      className={classes.join(' ')}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button