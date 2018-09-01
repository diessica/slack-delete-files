#!/usr/bin/env node

const got = require("got")
const Limiter = require("bottleneck")
const options = require("./cli-options")
const { argv } = require("yargs").options(options)

const slackClient = new Limiter({
  maxConcurrent: 1,
  minTime: 2000
}).wrap(
  got.extend({
    baseUrl: "https://slack.com/api",
    headers: { Authorization: `Bearer ${argv.token}` }
  })
)

const getFiles = () => {
  const ONE_DAY_IN_SECONDS = 86400
  const age = Math.floor(Date.now() / 1000) - argv.age * ONE_DAY_IN_SECONDS

  return slackClient("files.list", {
    body: {
      token: argv.token,
      ts_to: age,
      count: argv.max
    },
    form: true,
    json: true
  }).then(response => response.body.files)
}

const filterFiles = ({ shouldDeletePinned }) => (files = []) => {
  const excludePinned = files => files.filter(file => !file.pinned_to)
  const filesToDelete = shouldDeletePinned ? files : excludePinned(files)

  if (!filesToDelete.length) {
    throw `There are no files older than ${argv.age} days to delete.`
  }

  return filesToDelete
}

const deleteFiles = (files = []) => {
  console.log(`Deleting ${files.length} file(s)...`)

  files.forEach(file =>
    slackClient("files.delete", {
      method: "POST",
      body: { token: argv.token, file: file.id },
      json: true,
      form: true
    })
      .then(({ body }) => {
        const { ok, error, warning } = body
        console.log(
          ok
            ? `${file.name} has been deleted.`
            : `Error '${error}' while deleting file. ${warning || ""}`
        )
      })
      .catch(error => console.error("Error while deleting file.", error))
  )
}

const init = () =>
  getFiles()
    .then(filterFiles({ shouldDeletePinned: argv.pinned }))
    .then(deleteFiles)
    .catch(console.error)

init()

module.exports = {
  filterFiles
}
