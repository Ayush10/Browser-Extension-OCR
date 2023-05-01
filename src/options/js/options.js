document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect')
  const saveOptionsButton = document.getElementById('saveOptionsButton')

  // Load saved options when the page is opened
  loadOptions()

  // Save options when the save button is clicked
  saveOptionsButton.addEventListener('click', () => {
    saveOptions()
  })

  // Function to save options
  function saveOptions() {
    const options = {
      recognitionLanguage: languageSelect.value,
    }

    chrome.storage.sync.set({ options }, () => {
      alert('Options saved')
    })
  }

  // Function to load saved options
  function loadOptions() {
    chrome.storage.sync.get('options', (data) => {
      if (data.options) {
        languageSelect.value = data.options.recognitionLanguage || 'eng'
      }
    })
  }
})
