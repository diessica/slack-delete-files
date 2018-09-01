# slack-delete-files [![npm version](https://img.shields.io/npm/v/slack-delete-files.svg)](https://www.npmjs.com/package/slack-delete-files) [![Build Status](https://travis-ci.org/diessica/slack-delete-files.svg)](https://travis-ci.org/diessica/slack-delete-files)

> Mass delete files from Slack using JavaScript.

Because Slack comes with limited file storage and there's no way to bulk delete files in order to free up space. ([Source](https://get.slack.help/hc/en-us/articles/218159688-Delete-shared-files))

## Install

:warning: This app depends on [Node.js](https://nodejs.org/) 8+.

```sh
$ npm install -g slack-delete-files
```

Instead of polluting global installs, you can also run the Node binary directly:
```sh
$ npx slack-delete-files
```

## Usage

```sh
$ slack-delete-files

Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --token, -t  Slack token                                   [string] [required]
  --pinned     Include pinned files                   [boolean] [default: false]
  --max        Amount of files to fetch                 [number] [default: 1000]
  --age        Delete only files older than the specified number of days
                                                          [number] [default: 30]
```

A Slack API token (`--token`) is required! Grab yours in [Slack API docs](https://api.slack.com/custom-integrations/legacy-tokens).

###### Example

Below, we are deleting files **older than 60 days**, **including pinned files**.

```sh
slack-delete-files --age=60 --pinned --token=xoxp-34874354-4059649056
```

###### Limitations

* Does NOT delete files sent in people's private channels.

## License

MIT
