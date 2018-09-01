const test = require("ava")
const { filterFiles } = require("./")

test("[filterFiles] doesn't include pinned files if inquired", t => {
  const fakeFiles = [
    {
      name: "my_file.png",
      pinned_to: true
    },
    {
      name: "my_file_2.png",
      pinned_to: false
    }
  ]

  const fakeOptions = { includePinned: false }

  t.deepEqual(filterFiles(fakeOptions)(fakeFiles), [
    {
      name: "my_file_2.png",
      pinned_to: false
    }
  ])
})
