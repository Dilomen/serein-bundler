const fs = require('fs')
const generate = require('./generate.js')
const rule = {
  'entry': '必须传入entry', 
  'output':  '必须传入output'
}
const Observer = {
  listeners: [],
  listen: function(eventName, fn) {
    if (!(Array.isArray(this.listeners[eventName]))) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn)
  },
  trigger: function(eventName) {
    (this.listeners[eventName] || []).forEach(fn => {
      if (fn instanceof Function) {
        fn()
      }
    })
  }
}
class Compiler {
  constructor(options) {
    this.options = options
    this.Observer = Observer
  }
  build() {
    this.Observer.trigger('start')
    Object.keys(rule).forEach(key => {
      if (!this.options[key]) {
        throw new Error(rule[key])
      }
    })
    const { entry, output } = this.options
    const generateCode = generate(entry)
    fs.writeFileSync(output, generateCode);
    this.Observer.trigger('end')
  }
}

module.exports = Compiler