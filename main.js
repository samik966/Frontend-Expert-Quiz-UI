import { fetchQuestions, fetchSubmissions, transformQuestionsByCategory } from './quiz.js'
import { render } from './ui.js'

const CONTAINER_ID = 'container'

async function main () {
  const container = document.getElementById(CONTAINER_ID)
  const [questions, submissions] = await Promise.all([fetchQuestions(), fetchSubmissions()])
  const transformedQuestion = transformQuestionsByCategory(questions, submissions)
  render(transformedQuestion, container)
}

main()
