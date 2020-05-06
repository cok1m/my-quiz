import {
  CREATE_QUIZ_QUESTION,
  CREATE_QUIZ_NAME,
  RESET_QUIZ_CREATION,
} from '../actions/actionTypes'

const initialState = {
  quiz: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION: {
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    }

    case RESET_QUIZ_CREATION: {
      return {
        ...state,
        qioz: []
      }
    }

    case CREATE_QUIZ_NAME: {
      return {
        ...state,
        quiz: [[...state.quiz], {
          quizName: action.quizName
        }]
      }
    }
    default:
      return state
  }
}