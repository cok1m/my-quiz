import React from "react";
import styles from "./FinishedQuiz.module.scss";
import ResultItem from "./QuestionItem/ResultItem";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem) => {
          return (
            <ResultItem
              key={quizItem.id}
              id={quizItem.id}
              question={quizItem.question}
              results={props.results}
            />
          );
        })}
      </ul>
      <p>
        Правильно {props.successCount} из {props.quizLength}
      </p>
      <div>
        <Button type="primary" onClick={props.onRetry}>
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
