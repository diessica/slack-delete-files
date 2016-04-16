# slack-delete-files
> :warning: [Node.js](https://nodejs.org/) >= 5.0.0 required.

Mass delete files from Slack using JavaScript.

## Motivation
Slack comes with limited file storage and there's no way to bulk delete files using the web interface in order to free up space.

This script lets you mass delete **all files** or only **files older than 30 days**.

## Install
> It'll install the module globally so you can use it from anywhere in your computer.

```
npm install -g slack-delete-files
```

## Usage
```
$ slack-delete-files
```
You'll be asked for a token. Get it in [Slack API documentation](https://api.slack.com/docs/oauth-test-tokens).

## Limitations
- Cannot delete files sent privately.
- 1000 files per execution.

## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Diéssica Gurskas](https://diessi.ca) has waived all copyright and related or neighboring rights to this work.
