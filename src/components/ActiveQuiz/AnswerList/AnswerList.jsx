import React from "react";
import styles from "./AnswerList.module.scss"
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) => {
  return (
    <ul className={styles.AnswerList}>
      {props.answers.map(answer => {
        return (
          <AnswerItem 
            answer={answer} 
            key={answer.id} 
            onAnswerClick={props.onAnswerClick}
            answerState={props.answerState ? props.answerState[answer.id] : null}
          />
        )
      })}
    </ul>
  );
};

export default AnswerList;
