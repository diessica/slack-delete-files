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

const formatBytes = (a,b) => {if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

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

  var totalBytes = 0
  files.forEach(file => {
    totalBytes += file.size 
    if (argv.dryrun) {
      console.log('Deleting file named ' + file.name + ' will clean out ' + formatBytes(file.size) + '.')
    }
    else {
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
    }
  })
  console.log('This will clean up ' + formatBytes(totalBytes) + '.')
}

const init = () =>
  getFiles()
    .then(filterFiles({ shouldDeletePinned: argv.pinned }))
    .then(deleteFiles)
    .catch(console.error)

if (argv.dryrun) console.log('<<DRY RUN ONLY - NO FILES WILL BE DELETED>>')
init()

module.exports = {
  filterFiles
}
