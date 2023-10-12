const dfs = (graphComponentMatrix, i, j, visited, dfsVisited) => {
  visited[i][j] = true;
  dfsVisited[i][j] = true;

  for (
    let children = 0;
    children < graphComponentMatrix[i][j].length;
    children++
  ) {
    let [childRowId, childColId] = graphComponentMatrix[i][j][children];
    if (visited[childRowId][childColId] === false) {
      if (
        dfs(graphComponentMatrix, childRowId, childColId, visited, dfsVisited)
      )
        return true;
    } else if (
      visited[childRowId][childColId] === true &&
      dfsVisited[childRowId][childColId] === true
    )
      return true;
  }
  dfsVisited[i][j] = false;
  return false;
};
const isCyclePresent = graphComponentMatrix => {
  let visited = [];
  let dfsVisited = [];
  for (let i = 0; i < rows; i++) {
    let visitedCol = [];
    let dfsVisitedCol = [];
    for (let j = 0; j < cols; j++) {
      visitedCol.push(false);
      dfsVisitedCol.push(false);
    }
    visited.push(visitedCol);
    dfsVisited.push(dfsVisitedCol);
  }
  let response = false;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        response = dfs(graphComponentMatrix, i, j, visited, dfsVisited);
      }
      if (response === true) return [i, j];
    }
  }
  return null;
};
