# slack-delete-files [![npm version](https://img.shields.io/npm/v/slack-delete-files.svg)](https://www.npmjs.com/package/slack-delete-files) [![Build Status](https://travis-ci.org/diessica/slack-delete-files.svg)](https://travis-ci.org/diessica/slack-delete-files)

> Mass delete files from Slack using JavaScript.

![Running slack-delete-files on terminal](https://cloud.githubusercontent.com/assets/5303585/25916939/c69d6b98-359c-11e7-8cc2-526420d18740.gif)

Because Slack comes with limited file storage and there's no way to bulk delete files using the web interface in order to free up space. ([Source](https://get.slack.help/hc/en-us/articles/218159688-Delete-shared-files))

## Install
:warning: Make sure you have [Node.js](https://nodejs.org/) 5+ installed.

```sh
$ npm install -g slack-delete-files
```

> This installs it globally so you can use it from anywhere in your computer.

## Usage

```sh
$ slack-delete-files
```

A Slack API token is required. Grab yours in [Slack API docs](https://api.slack.com/custom-integrations/legacy-tokens)!

###### Features
- Can keep recent files, deleting only files older than **30 days**.
- Can keep pinned files.

###### Limitations
- Cannot delete files sent privately.
- Deletes up to 1000 files per execution.

## License
MIT
