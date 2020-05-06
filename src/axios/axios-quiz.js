import axios from 'axios'

const axiosQuiz = axios.create({
  baseURL: 'https://react-my-quiz.firebaseio.com/',
})

export default axiosQuiz
