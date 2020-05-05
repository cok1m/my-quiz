import React from "react";
import styles from "./ResultItem.module.scss";

const ResultItem = (props) => {
  const classes = [
    'fa',
    props.results[props.id] === 'success' ? 'fa-check' : 'fa-times',
    styles[props.results[props.id]]
  ]
  return (
    <li className={styles.ResultItem }>
      <strong>{props.id}. </strong>
      {props.question}
      <i className={classes.join(' ')} />
    </li>
  );
};

export default ResultItem