(function(graph) {
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
        require('./src/main.js')
  })({"./src/main.js":{"code":"\"use strict\";\n\nvar _until = _interopRequireDefault(require(\"./until.js\"));\n\nvar _sayHello = _interopRequireDefault(require(\"./sayHello.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n// main.js\n(0, _until[\"default\"])(1, 2);\n(0, _sayHello[\"default\"])();\ndocument.write('22454446333');","dependencies":{"./until.js":"./src/until.js","./sayHello.js":"./src/sayHello.js"}},"./src/until.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction add(a, b) {\n  return a + b;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","dependencies":{}},"./src/sayHello.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction sayHello() {\n  console.log('Hell333o');\n}\n\nvar _default = sayHello;\nexports[\"default\"] = _default;","dependencies":{}}})