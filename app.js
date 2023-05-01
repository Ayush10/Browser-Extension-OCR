const T = require('tesseract.js')

// T.recognize('img.png', 'eng', { logger: (m) => console.log(m) }).then((out) =>
//   console.log(out.data.text)
// )
// Code to export the text from the image to a text file
T.recognize('img.png', 'eng', { logger: (m) => console.log(m) })
  .then(({ data: { text } }) => {
    console.log(text)
    const fs = require('fs')
    fs.writeFile('output.txt', text, (err) => {
      if (err) throw err
      console.log('The file has been saved!')
    })
  })
  .catch((err) => {
    console.error(err)
  })
