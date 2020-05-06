import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  SET_SUCCESS_COUNT
} from './actionTypes'
import axiosQuiz from '../../axios/axios-quiz'

export const fetchQuizes = () => async dispatch => {
  dispatch(fetchQuizesStart())
  try {
    const response = await axiosQuiz.get('quizes.json')
    const quizes = []
    Object.keys(response.data).forEach((key) => {
      quizes.push({
        id: key,
        name: `Тест: ${response.data[key][1].quizName}`
      })
    })

    dispatch(fetchQuizesSuccess(quizes))
  } catch (error) {
    dispatch(fetchQuizesError(error))
  }
}

export const fetchQuizById = quizId => async dispatch => {
  dispatch(fetchQuizesStart())
  try {
    const response = await axiosQuiz.get(`/quizes/${quizId}.json`);
    const quiz = response.data[0];
    dispatch(fetchQuizSuccess(quiz))
  } catch (error) {
    dispatch(fetchQuizesError(error))
  }
}

const fetchQuizesStart = () => ({
    type: FETCH_QUIZES_START
})

const fetchQuizesSuccess = (quizes) => ({
    type: FETCH_QUIZES_SUCCESS,
    quizes
})

const fetchQuizesError = error => ({
    type: FETCH_QUIZES_ERROR,
    error
})

const fetchQuizSuccess = quiz => ({
  type: FETCH_QUIZ_SUCCESS,
  quiz
})

const quizSetState = (answerState, results) => ({
  type: QUIZ_SET_STATE,
  answerState,
  results
})

const finishQuiz = () => ({
  type: FINISH_QUIZ
})

const quizNextQuestion = (questionNumber) => ({
  type: QUIZ_NEXT_QUESTION,
  questionNumber
})

export const retryQuiz = () => ({
  type: QUIZ_RETRY
})

const isQuizFinished = (state) => {
  return state.activeQuestion === state.quiz.length - 1;
}

const setSuccessCount = () => ({
  type: SET_SUCCESS_COUNT
})

export const quizAnswerClick = answerId => (dispatch, getState) => {
  const state = getState().quiz
  if (state.answerState) {
    return;
  }
  const question = state.quiz[state.activeQuestion];
  const results = state.results
  if (answerId === question.rightAnswerId) {
    results[question.id] = 'success'
    dispatch(setSuccessCount())
    dispatch(quizSetState({ [answerId]: "success" }, results))
  } else {
    results[question.id] = 'error'
    dispatch(quizSetState({ [answerId]: "error" }, results))

  }

  const timeout = setTimeout(() => {
    if (isQuizFinished(state)) {
      dispatch(finishQuiz())

    } else {

      dispatch(quizNextQuestion(state.activeQuestion + 1))
    }
    clearTimeout(timeout);
  }, 1000);
}
