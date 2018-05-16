# Changelog
This project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>
</details>

## 2.0.0 (May 16th, 2018)
* Introduced command line args instead of the previous interactive command-line interface. ([Issue #4](https://github.com/diessica/slack-delete-files/issues/4))
* Introduced ability to fetch a different amount of files per execution.
* Introduced number of days option (Based on [PR #8](https://github.com/diessica/slack-delete-files/pull/8) suggestion)
* Fixed timeout when deleting files by controlling rate limit during file deleting. (Thanks to everyone involved in [Issue #9](https://github.com/diessica/slack-delete-files/issues/9))
* Started using [Prettier](https://prettier.io/).
* Stopped using [yarn](https://yarnpkg.com/en/).

## 1.1.0 (May 10th, 2017)
* Introduced ability to keep channel's pinned files.

## 1.0.0 (April 17th, 2016)
* Introduced initial public release.
