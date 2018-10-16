module.exports = {
  token: {
    alias: "t",
    describe: "Slack token",
    type: "string",
    demandOption: process.env.NODE_ENV !== "test"
  },
  pinned: {
    describe: "Include pinned files",
    default: false,
    type: "boolean"
  },
  max: {
    describe: "Amount of files to fetch",
    default: 1000,
    type: "number",
    number: true
  },
  age: {
    describe: "Delete only files older than the specified number of days",
    default: 30,
    type: "number",
    number: true
  },
  dryrun: {
    describe: "If true, only print the files that would be deleted, without deleting them.",
    default: false,
    type: "boolean"
  }
}
