import React from "react";
import styles from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      successCount: 0,
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      title: "Ответьте на все вопросы",
      quiz: [
        {
          id: 1,
          question: "Сколько дней в высокосный год?",
          rightAnswerId: 2,
          answers: [
            { id: 1, text: "365" },
            { id: 2, text: "366" },
            { id: 3, text: "364" },
            { id: 4, text: "367" },
          ],
        },
        {
          id: 2,
          question: "Какая птица самая маленькая на Замле?",
          rightAnswerId: 3,
          answers: [
            { id: 1, text: "Какаду" },
            { id: 2, text: "Пеликан" },
            { id: 3, text: "Колибри" },
            { id: 4, text: "Сова" },
          ],
        },
      ],
    };
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      return
    }
    const question = this.state.quiz[this.state.activeQuestion]
    if (answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId) {
      this.setState({
        answerState: {[answerId]: 'success'},
        results: {
          ...this.state.results,
          [question.id]: 'success'}
      })
    } else {
      this.setState({
        answerState: {[answerId]: 'error'},
        results: {
          ...this.state.results,
          [question.id]: 'error'}
      })
    }

    const timeout = setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true,
          successCount: this.successCount(),
          title: 'Ваши результаты'
        })
      } else {
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null
        });
      }
      clearTimeout(timeout);
    }, 1000);
  };

  isQuizFinished = () =>
    this.state.activeQuestion === this.state.quiz.length - 1;

  successCount = () => {
    return Object.keys(this.state.results).reduce((total, key) => {
      if (this.state.results[key] === 'success') {
        total++
      }
      return total
    }, 0)
  }

  retryHandler = () => {
    this.setState({
      results: {},
      successCount: 0,
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      title: "Ответьте на все вопросы"
    })
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.Quiz__wrapper}>
          <h1>{this.state.title}</h1>

          {this.state.isFinished
            ? <FinishedQuiz 
                quiz={this.state.quiz}
                quizLength={this.state.quiz.length}
                successCount={this.state.successCount}
                results={this.state.results}
                onRetry={this.retryHandler}
              />
            : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                quizLength={this.state.quiz.length}
                rightAnswerId={this.state.quiz[0].rightAnswerId}
                onAnswerClick={this.onAnswerClickHandler}
                activeQuestion={this.state.activeQuestion + 1}
                answerState={this.state.answerState}
              />
          }

        </div>
      </div>
    );
  }
}

export default Quiz;
