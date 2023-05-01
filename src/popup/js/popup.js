document.addEventListener('DOMContentLoaded', () => {
  const extractTextButton = document.getElementById('extractTextButton')
  const extractedTextElement = document.getElementById('extractedText')
  const copyTextButton = document.getElementById('copyTextButton')

  // Function to handle the extract text button click
  extractTextButton.addEventListener('click', async () => {
    extractTextButton.disabled = true

    try {
      const response = await sendExtractTextMessage()
      if (response.status === 'success') {
        extractedTextElement.value = response.extractedText
      } else {
        extractedTextElement.value = 'Error: ' + response.message
      }
    } catch (error) {
      extractedTextElement.value = 'Error: Unable to extract text'
    }

    extractTextButton.disabled = false
  })

  // Function to handle the copy text button click
  copyTextButton.addEventListener('click', () => {
    extractedTextElement.select()
    document.execCommand('copy')
  })

  // Function to send a message to the content script to extract text
  function sendExtractTextMessage() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'extractText' }, resolve)
      })
    })
  }
})

// Add this code to the end of the file
document.getElementById('capture-screen-btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, { action: 'captureScreen' })
  })
})
