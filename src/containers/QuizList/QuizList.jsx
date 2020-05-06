import React, { Component } from "react";
import styles from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {
  componentDidMount() {
    this.props.fetchQuizes()
  }
  
  renderQuizes = () => this.props.quizes.map(quiz => {
    return (
      <li key={quiz.id}>
        <NavLink
          to={'/quiz/' + quiz.id}
        >
          {quiz.name}
        </NavLink>
      </li>
    )
  }) 
  
  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {
            this.props.loading && this.props.quizes.length !== 0
              ? <Loader />
              : <ul>
                  {this.renderQuizes()}
                </ul>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quizes: state.quiz.quizes,
  loading: state.quiz.loading
})

const mapDispatchToProps = dispatch => ({
  fetchQuizes: () => dispatch(fetchQuizes())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)