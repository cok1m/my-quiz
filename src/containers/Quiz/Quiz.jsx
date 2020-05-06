import React from "react";
import styles from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import { withRouter } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.Quiz__wrapper}>
          <h1>{this.props.title}</h1>

          {this.props.loading || !this.props.quiz
            ?
            <Loader />
            : this.props.isFinished 
              ? <FinishedQuiz
                  quiz={this.props.quiz}
                  quizLength={this.props.quiz.length}
                  successCount={this.props.successCount}
                  results={this.props.results}
                  onRetry={this.props.retryQuiz}
                />
              : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  quizLength={this.props.quiz.length}
                  rightAnswerId={this.props.quiz[0].rightAnswerId}
                  onAnswerClick={this.props.quizAnswerClick}
                  activeQuestion={this.props.activeQuestion + 1}
                  answerState={this.props.answerState}
                />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.quiz.results,
  successCount: state.quiz.successCount,
  isFinished: state.quiz.isFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  title: state.quiz.title,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: id => dispatch(fetchQuizById(id)),
  quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
  retryQuiz: () => dispatch(retryQuiz())
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Quiz);
