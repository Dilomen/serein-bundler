const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const moduleAnalyser = (filename) => {
  // 模块（文件）内容
  const source = fs.readFileSync(filename, 'utf-8');
  const ast = babelParser.parse(source, {
    // 具有ES6导入和导出的文件被视为"module"，否则被视为"script""
    sourceType: 'module',
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 返回path的目录名 + 引入时的相对地址 => 相对根目录的相对地址
      const dirname = path.dirname(filename);
      const importPath = node.source.value;
      const filePath = './' + path.join(dirname, importPath);
      dependencies[importPath] = filePath;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    // modules默认转化为"auto"
    presets: ['@babel/preset-env'],
  });
  return { filename, dependencies, code };
};
module.exports = moduleAnalyser;
