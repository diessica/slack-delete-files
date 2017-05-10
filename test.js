const test = require('ava')
const { filterFiles } = require('./')

test('[filterFiles] throws message for no results', t => {
  const errorMessage = t.throws(() => filterFiles([], {}))
  t.is(errorMessage, 'There are no files to be deleted.')
})

test('[filterFiles] throws message for unexpected responses', t => {
  const errorMessage = t.throws(() => filterFiles(undefined, {}))
  t.is(errorMessage, 'Unexpected response from API. Try generating another token!')
})

test('[filterFiles] doesn\'t include pinned files if inquired', t => {
  const fakeFiles = [{
    name: 'my_file.png',
    pinned_to: true
  }, {
    name: 'my_file_2.png',
    pinned_to: false
  }]

  const fakeOptions = { keepPinned: true }

  t.deepEqual(filterFiles(fakeFiles, fakeOptions), [{
    name: 'my_file_2.png',
    pinned_to: false
  }])
})
