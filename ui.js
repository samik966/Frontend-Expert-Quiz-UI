const COMPLETE_STATUS = 'complete'
const classNames = {
  category: 'category',
  questions: 'questions',
  question: 'question',
  status: 'status'
}

const elementType = {
  container: 'section',
  questionsContainer: 'section',
  questionContainer: 'article',
  statusContainer: 'div'
}

function createText (tag, content) {
  const textEl = document.createElement(tag)
  textEl.textContent = content
  return textEl
}

function createContainer (el, ...classNames) {
  const containerEl = document.createElement(el)
  containerEl.classList.add(...classNames)
  return containerEl
}

function createCategory (category) {
  const categoryEl = createContainer(elementType.container, classNames.category)
  const categoryTitle = createText('h2', category)
  categoryEl.append(categoryTitle)
  return categoryEl
}

function createQuestion (question) {
  const questionEl = createContainer(elementType.questionContainer, classNames.question)
  const questionTitle = createText('h3', question.name)
  questionTitle.title = question.status ? question.status[0].toUpperCase() + question.status.substring(1).replace('_', ' ') : 'Click to solve'
  questionEl.append(questionTitle)
  return questionEl
}

function createStatus (status) {
  const statusClass = status && status.toLowerCase().replace('_', '-')
  const statusEl = createContainer(elementType.statusContainer, classNames.status, statusClass)
  return statusEl
}

function createAllQuestions (questions) {
  const questionsContainer = createContainer(elementType.questionsContainer, classNames.questions)
  questions.forEach((question) => {
    const questionEl = createQuestion(question)
    const questionStatus = createStatus(question?.status)
    questionEl.prepend(questionStatus)
    questionsContainer.append(questionEl)
  })
  return questionsContainer
}

function getCompletedCount (questions) {
  return questions.filter(question => question.status === COMPLETE_STATUS).length
}

export function render (questionsRes, wrapperEl) {
  for (const [category, questions] of Object.entries(questionsRes)) {
    const completedCount = getCompletedCount(questions)
    const categoryTitle = `${category} - ${completedCount} / ${questions.length}`
    const categoryEl = createCategory(categoryTitle)
    const questionsEl = createAllQuestions(questions)
    categoryEl.append(questionsEl)
    wrapperEl.append(categoryEl)
  }
}
