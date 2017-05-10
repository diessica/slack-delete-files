#!/usr/bin/env node
'use strict'

const got = require('got')
const inquirer = require('inquirer')
const API_URL = 'https://slack.com/api'

function run (token, options) {
  const thirtyDaysAgo = Math.floor(new Date().getTime() / 1000) - 30 * 86400

  got(`${API_URL}/files.list`, {
    body: {
      token,
      ts_to: options.oldOnly ? thirtyDaysAgo : 0,
      count: 1000
    },
    json: true
  })
    .then(response => filterFiles(response.body.files, options))
    .then(files => deleteFiles(token, files))
    .catch(console.error)
}

function filterFiles (files, options) {
  if (!files) {
    throw  'Unexpected response from API. Try generating another token!'
  }

  const removePinned = files => files.filter(file => !file.pinned_to)
  const filesToDelete = options.keepPinned ? removePinned(files) : files

  if (!filesToDelete.length) {
    throw  'There are no files to be deleted.'
  }

  return filesToDelete
}

function deleteFiles (token, files) {
  console.log(`Deleting ${files.length} file(s)...`)

  files.forEach(file =>
    got(`${API_URL}/files.delete`, { body: { token, file: file.id } })
      .then(() => console.log(`${file.name} was deleted.`))
      .catch(error => console.error('Error while deleting files.', error))
  )
}

exports.filterFiles = filterFiles

inquirer.prompt([{
  message: 'Please, enter your Slack token.',
  name: 'token',
  type: 'input'
}, {
  message: 'Delete ONLY files older than 30 days?',
  name: 'oldOnly',
  type: 'confirm',
  default: false
}, {
  message: 'Keep pinned files?',
  name: 'keepPinned',
  type: 'confirm',
  default: false
}])
  .then(answers => run(answers.token, {
    oldOnly: answers.oldOnly,
    keepPinned: answers.keepPinned
  }))
  .catch(error => console.error('Error while asking for token.', error))
