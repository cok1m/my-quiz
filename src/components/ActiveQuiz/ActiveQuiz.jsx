import React from "react";
import styles from "./ActiveQuiz.module.scss";
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = (props) => {
  return (
    <div className={styles.ActiveQuiz}>
      <div className={styles.Question}>
        <span>
          <strong>{props.activeQuestion}. </strong>
          {props.question}
        </span>
        <small>{props.activeQuestion} из {props.quizLength}</small>
      </div>
      <AnswerList 
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}  
        answerState={props.answerState}
      />
    </div>
  );
};

export default ActiveQuiz;
