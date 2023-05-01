// Function to find all images and video thumbnails on the page
function findAllImages() {
  const images = Array.from(document.querySelectorAll('img'))
  const videoThumbnails = Array.from(document.querySelectorAll('ytd-thumbnail'))
    .map((thumbnail) => {
      const imgElement = thumbnail.querySelector('img')
      return imgElement && imgElement.src
    })
    .filter((src) => src)

  return [...images, ...videoThumbnails]
}

// Function to process the images using Tesseract.js and extract text
async function extractTextFromImages(images) {
  const extractedTexts = []
  const tesseract = window.Tesseract

  for (const img of images) {
    try {
      const result = await tesseract.recognize(img)
      extractedTexts.push(result.data.text)
    } catch (error) {
      console.error('Error in text recognition:', error)
    }
  }

  return extractedTexts.join('\n')
}

// Function to handle the message from the popup
async function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'extractText':
      try {
        const images = findAllImages()
        const extractedText = await extractTextFromImages(images)
        sendResponse({ status: 'success', extractedText })
      } catch (error) {
        sendResponse({
          status: 'error',
          message: 'An error occurred while extracting text.',
        })
      }
      break
    case 'captureScreen':
      captureScreen()
      break
    case 'processCapturedImage':
      processCapturedImage(request)
      break
    default:
      sendResponse({ status: 'error', message: 'Unknown action' })
      break
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender, sendResponse)
  return true // Required for async response
})

// Function to capture the visible part of the screen
function captureScreen() {
  chrome.runtime.sendMessage({ action: 'captureVisibleTab' })
}

// Function to process the captured image using Tesseract.js and extract text
function processCapturedImage(message) {
  const img = new Image()
  img.src = message.dataUrl
  img.onload = () => {
    Tesseract.recognize(img, 'eng', { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        console.log('Recognized text:', text)
        // Do something with the recognized text, like displaying it in the popup or sending it to the background script
      }
    )
  }
}
