export const imgError = {
  inserted: function(element, { value }) {
    if (!element.src) {
      element.src = value
    } else {
      element.onerror = function() {
        element.src = value
      }
    }
  },
  update: function(element, { value }) {
    if (!element.src) {
      element.src = value
    }
  }
}
