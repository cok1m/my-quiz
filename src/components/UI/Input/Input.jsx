import React from 'react'
import styles from './Input.module.scss'

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched
}

const Input = ({type = 'text', label, value, onChange, errorMessage, onBlur, ...props}) => {
  const classes = [
    styles.Input,
  ]
  const htmlFor = `${type}-${Math.random()}}`

  if (isInvalid(props)) {
    classes.push(styles.invalid)
  }

  return (
    <div className={classes.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        value={value}
        onChange={onChange} 
        type={type}
        onBlur={onBlur}
      />
      {
        isInvalid(props)
          ? <span>{errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input