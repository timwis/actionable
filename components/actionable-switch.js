const html = require('choo/html')
const Nanocomponent = require('nanocomponent')

module.exports = class ActionableSwitch extends Nanocomponent {
  constructor (setActionable) {
    super()
    this.onChange = this.onChange.bind(this)
  }

  render (actionable = false, setActionable) {
    this.actionable = actionable
    this.setActionable = setActionable

    return html`
      <div class="switch">
        <label>
          All tasks
          <input type="checkbox" ${actionable ? 'checked' : ''} onchange=${this.onChange} />
          <span class="lever"></span>
          Actionable
        </label>
      </div>
    `
  }

  update (actionable, setActionable) {
    return actionable !== this.actionable
  }

  onChange (evt) {
    const value = !!evt.target.checked
    if (this.setActionable) this.setActionable(value)
  }
}
