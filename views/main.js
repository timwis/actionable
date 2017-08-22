const html = require('choo/html')
const css = require('sheetify')

const ActionableSwitch = require('../components/actionable-switch')
const actionableSwitch = new ActionableSwitch()

const TaskList = require('../components/task-list')
const taskList = new TaskList()

const TITLE = 'Actionable'

const styles = css`
  .switch-container {
    margin: 20px 0 0 20px;
    text-align: center;
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  if (!state.tasksFetched) emit('fetchTasks')

  const tasks = (state.actionable === true)
    ? state.tasks.filter(isActionable)
    : state.tasks

  return html`
    <body>
      <div class="container ${styles}">
        <div class="switch-container">
          ${actionableSwitch.render(state.actionable, setActionable)}
        </div>
        ${taskList.render(tasks)}
      </div>
    </body>
  `

  function isActionable (task) {
    return (task.children.length === 0)
  }

  function setActionable (newValue) {
    emit('setActionable', newValue)
  }
}
