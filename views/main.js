const html = require('choo/html')

const TaskList = require('../components/task-list')
const taskList = new TaskList()

const TITLE = 'Actionable'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  if (!state.tasksFetched) emit('fetchTasks')

  return html`
    <body>
      <div class="container">
        ${taskList.render(state.tasks)}
      </div>
    </body>
  `
}
