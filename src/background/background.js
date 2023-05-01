chrome.runtime.onInstalled.addListener(() => {
  // Inject Tesseract.js library into content script
  chrome.webNavigation.onCommitted.addListener((details) => {
    chrome.tabs.executeScript(details.tabId, {
      file: 'libs/tesseract.min.js',
      runAt: 'document_start',
      allFrames: false,
    })
  })
})

// Function to handle messages from content scripts
function handleMessage(message, sender, sendResponse) {
  switch (message.action) {
    case 'captureVisibleTab':
      captureVisibleTab(message, sender, sendResponse)
      break
    default:
      sendResponse({ status: 'error', message: 'Unknown action' })
      break
  }
}

// Function to capture the visible part of the current tab
function captureVisibleTab(message, sender, sendResponse) {
  chrome.tabs.captureVisibleTab(
    null,
    { format: 'png', quality: 100 },
    (dataUrl) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        action: 'processCapturedImage',
        dataUrl: dataUrl,
      })
    }
  )
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse)
  return true // Required for async response
})
