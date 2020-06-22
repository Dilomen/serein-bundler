const moduleAnalser = require('./moduleAnalser');
// 递归模块 -> 将所有模块扁平化到一层
const graphArray = [];
function handleDependencies(entry) {
  const module = moduleAnalser(entry);
  graphArray.push(module);
  if (module && module.dependencies && module.dependencies.length === 0) {
    return false;
  }
  const { dependencies } = module;
  for (const key in dependencies) {
    if (dependencies.hasOwnProperty(key)) {
      const element = dependencies[key];
      const module = moduleAnalser(element);
      handleDependencies(module.filename);
    }
  }
  return graphArray;
}

// 组成 filename: { code, dependencies } 的 graph
const makeGraph = (entry) => {
  const graphArray = handleDependencies(entry);
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      code: item.code,
      dependencies: item.dependencies,
    };
  });
  return graph;
};
module.exports = makeGraph;
