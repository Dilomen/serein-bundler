const fs = require('fs')
const generate = require('../utils/generate.js')
const path = require('path')
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
    try {
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
    } catch(err) {
      console.error('DEV Error: ' + err)
    } 
  }
  run() {
    try {
      const { entry, output } = this.options
      const generateCode = generate(entry)
      const filePath = path.resolve(__dirname, './build.js')
      fs.writeFileSync(filePath, generateCode);
    } catch(err) {
      console.error('DEV Error: ' + err)
    } 
  }
}

module.exports = Compiler