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
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  successCount: 0,
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  title: "Ответьте на все вопросы",
  quiz: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZES_START: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_QUIZES_SUCCESS: {
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      }
    }

    case FETCH_QUIZES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case FETCH_QUIZ_SUCCESS: {
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      }
    }

    case QUIZ_SET_STATE: {
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    }

    case FINISH_QUIZ: {
      return {
        ...state,
        isFinished: true,
        title: "Ваши результаты"
      }
    }

    case QUIZ_NEXT_QUESTION: {
      return {
        ...state,
        answerState: null,
        activeQuestion: action.questionNumber
      }
    }

    case QUIZ_RETRY: {
      return {
        ...state,
        results: {},
        successCount: 0,
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        title: "Ответьте на все вопросы",
      }
    }

    case SET_SUCCESS_COUNT: {
      return {
        ...state, 
        successCount: state.successCount + 1
      }
    }

    default: {
      return state;
    }
  }
}