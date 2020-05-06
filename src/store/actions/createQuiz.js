import {
  CREATE_QUIZ_QUESTION,
  CREATE_QUIZ_NAME,
  RESET_QUIZ_CREATION
} from '../actions/actionTypes'
import axiosQuiz from '../../axios/axios-quiz';

export const createQuizQuestion = item => ({
  type: CREATE_QUIZ_QUESTION,
  item
})

export const createQuizName = quizName => ({
  type: CREATE_QUIZ_NAME,
  quizName
})

const resetQuizCreation = () => ({
  type: RESET_QUIZ_CREATION
})

export const finishCreateQuiz = () => async (dispatch, getState) => {
  await axiosQuiz.post("quizes.json", getState().createQuiz.quiz)
  dispatch(resetQuizCreation())
}