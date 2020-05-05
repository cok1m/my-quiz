import React from 'react'
import styles from './AnswerItem.module.scss'

const AnswerItem = props => {
  const classes = [styles.AnswerItem]
  if (props.answerState) {
    classes.push(styles[props.answerState])
  }

  return (
    <li
      onClick={() => props.onAnswerClick(props.answer.id)} 
      className={classes.join(' ')}
    >
      {props.answer.text}
    </li>
  )
}

export default AnswerItem