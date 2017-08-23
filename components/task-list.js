const Nanocomponent = require('nanocomponent')
const bindAll = require('lodash/bindAll')
const arrayToTree = require('array-to-tree')
const html = require('choo/html')
const dragula = require('dragula')
const css = require('sheetify')

css('dragula/dist/dragula.css')

const styles = css`
  :host {
    border: 1px solid #e0e0e0;
    border-top: none;
  }
  .task-container {
    border-top: 1px solid #e0e0e0;
    list-style-type: none;
  }
  .task-item {
    padding-left: 15px;
  }
  .task-title {
    color: inherit;
  }
  .task-container .task-container {
    padding-left: 20px;
  }
  .task-container .task-container .task-container {
    margin-left: -20px;
    padding-left: 40px;
  }
  .task-container.gu-transit {
    background: #87ceeb;
    border: 1px dashed #4682b4;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

`

module.exports = class TaskList extends Nanocomponent {
  constructor () {
    super()
    this.tasksByParent = []
    bindAll(this, ['recursiveTask', 'onDragBegin', 'onDragEnd', 'onDrop'])
  }

  createElement (tasks) {
    this.tasks = tasks
    const taskTree = arrayToTree(tasks, { parentProperty: 'parent.id' })

    return html`
      <ul class="task-list ${styles}">
        ${taskTree.map(this.recursiveTask)}
      </ul>
    `
  }

  recursiveTask (task) {
    return html`
      <li class="task-container" id="task-${task.id}">
        <p class="task-item">
          <input class="filled-in" type="checkbox" id="${task.id}" />
          <label class="task-title" for="${task.id}">${task.title}</label>
        </p>
        <ul class="task-list">
          ${task.children.map(this.recursiveTask)}
        </ul>
      </li>
    `
  }

  load () {
    dragula({
      siblingClass: 'task-item',
      isContainer: (el) => el.classList.contains('task-list')
    }).on('drag', this.onDragBegin)
      .on('dragend', this.onDragEnd)
      .on('drop', this.onDrop)
  }

  onDragBegin () {
    this.element.classList.add('is-dragging')
  }

  onDragEnd () {
    this.element.classList.remove('is-dragging')
  }

  onDrop (el, target, source, sibling) {
    console.log('drop', el, target, source, sibling)
  }

  update (tasks) {
    return (tasks !== this.tasks)
  }
}
