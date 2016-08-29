#!/usr/bin/env node
'use strict'

const got = require('got')
const inquirer = require('inquirer')
const API_URL = 'https://slack.com/api'

/**
 * @param {String} token
 * @param {Boolean} onlyOldFiles
 */
function accessFiles (token, onlyOldFiles) {
  const thirtyDaysAgo = Math.floor(new Date().getTime() / 1000) - 30 * 86400;

  got(`${API_URL}/files.list`, {
    body: {
      token: token,
      ts_to: onlyOldFiles ? thirtyDaysAgo : 0,
      count: 1000
    },
    json: true
  })
    .then(response => deleteFiles(response.body.files))
    .catch(error => console.error('Error while getting files.', error))

  function deleteFiles (files) {
    if(!files) {
      console.error('Error while getting files.')
      return
    }

    if (!files.length) {
      console.info('There is no files to be deleted.')
      return
    }

    console.log(`Deleting ${files.length} files...`)
    files.map(file => deleteFile(file))
  }

  function deleteFile (file) {
    got(`${API_URL}/files.delete`, { body: { token: token, file: file.id } })
      .then(() => console.log(`${file.name} was deleted.`))
      .catch(error => console.error('Error while deleting files.', error))
  }
}

inquirer.prompt([{
  message: 'Enter your Slack token.',
  name: 'token',
  type: 'input',
}, {
  message: 'Delete only files older than 30 days?',
  name: 'onlyOldFiles',
  type: 'confirm',
  default: false
}])
  .then(answers => accessFiles(answers.token, answers.onlyOldFiles))
  .catch(error => console.error('Error while asking for token.', error))
