function debounce(fn, delay = 500) {
  let timer;
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

module.exports = debounce