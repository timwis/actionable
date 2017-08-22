const axios = require('axios')
const eres = require('eres')

const queries = require('./queries')

const GRAPHCOOL_ENDPOINT = process.env.GRAPHCOOL_ENDPOINT

module.exports = store

function store (state, emitter) {
  state.tasks = []
  state.tasksFetched = false

  emitter.on('fetchTasks', async () => {
    // const query = queries.allTasks()
    // const request = axios.post(GRAPHCOOL_ENDPOINT, query)
    // const [err, response] = await eres(request)
    // if (err) return console.log('error fetching tasks')
    // state.tasks = response.data.data.allTasks
    state.tasks = require('./sample-data.json').data.allTasks
    state.tasksFetched = true
    emitter.emit('render')
  })
}
