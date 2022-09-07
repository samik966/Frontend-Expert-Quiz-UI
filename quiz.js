export async function fetchQuestions () {
  const questionsRes = await fetch('./questions.json')
  return questionsRes.json()
}

export async function fetchSubmissions () {
  const submissionRes = await fetch('./submission.json')
  return submissionRes.json()
}

function findSubmissionByQuestion (question, submissions) {
  const submission = submissions.find(submission => submission.questionId === question.id)
  if (submission) {
    question = { ...question, status: submission.status }
  }
  return question
}

export function transformQuestionsByCategory (questions, submissions) {
  return questions.reduce((acc, question) => {
    const { category } = question
    const questionWithSubmission = findSubmissionByQuestion(question, submissions)
    acc[category] = acc[category] ? [...acc[category], questionWithSubmission] : [questionWithSubmission]
    return acc
  }, {})
}
