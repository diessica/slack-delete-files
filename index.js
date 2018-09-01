#!/usr/bin/env node

const got = require("got")
const Limiter = require("bottleneck")
const argv = require("yargs")
  .option("token", {
    alias: "t",
    describe: "Slack token",
    type: "string",
    demandOption: process.env.NODE_ENV !== "test"
  })
  .option("pinned", {
    describe: "Include pinned files when deleting",
    default: false,
    type: "boolean"
  })
  .option("max", {
    describe: "Amount of files to fetch",
    default: 1000,
    type: "number",
    number: true
  })
  .option("age", {
    describe: "Delete only files older than the specified number of days",
    default: 30,
    type: "number",
    number: true
  }).argv

const API_URL = "https://slack.com/api"

const filterFiles = ({ deletePinned }) => (files = []) => {
  const excludePinned = files => files.filter(file => !file.pinned_to)
  const filesToDelete = deletePinned ? files : excludePinned(files)

  if (!filesToDelete.length) {
    throw "There are no files to be deleted."
  }

  return filesToDelete
}

exports.filterFiles = filterFiles

const deleteFiles = (files = []) => {
  console.log(`Deleting ${files.length} file(s)...`)

  const gotLimited = new Limiter({ maxConcurrent: 1, minTime: 2000 }).wrap(got)

  files.forEach(file =>
    gotLimited(`${API_URL}/files.delete`, {
      method: "POST",
      body: { token: argv.token, file: file.id },
      json: true,
      form: true,
      headers: {
        Authorization: `Bearer ${argv.token}`
      }
    })
      .then(({ body }) => {
        ({ ok, error, warning } = body);

        if (ok) {
          console.log(`${file.name} has been deleted.`)
        } else {
          console.error(`Error '${error}' while deleting file. ${warning || ''}`)
        }
      })
      .catch(error => console.error("Error while deleting file.", error))
  )
}

const init = () => {
  const age = Math.floor(new Date().getTime() / 1000) - argv.age * 86400

  got(`${API_URL}/files.list`, {
    body: { token: argv.token, ts_to: age, count: argv.max },
    form: true,
    json: true
  })
    .then(response => response.body.files)
    .then(filterFiles({ deletePinned: argv.pinned }))
    .then(deleteFiles)
    .catch(console.error)
}

init()
