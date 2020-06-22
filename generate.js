const makeGraph = require('./makeGraph');
const generate = (entry) => {
  const graph = JSON.stringify(makeGraph(entry));
  return `(function(graph) {
        function require(module) {
            function localRequire(relativePath) {
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {};
            const code = graph[module].code;
            (function(require) {
                eval(code)
            })(localRequire);
            return exports;
        }
        require('${entry}')
  })(${graph})`;
}

module.exports = generate
