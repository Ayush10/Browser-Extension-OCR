const Utils = {
  // Utility function to convert ArrayBuffer to Base64
  arrayBufferToBase64: function (buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  },

  // Utility function to convert Base64 to ArrayBuffer
  base64ToArrayBuffer: function (base64) {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  },

  // Add more utility functions as needed
}

// Export the Utils object for use in other scripts
export default Utils
