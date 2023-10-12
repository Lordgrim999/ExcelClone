"use strict";

//coloring the cells in path

const colorPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const traceCycleDFS = async (
  graphComponentMatrix,
  i,
  j,
  visited,
  dfsVisited
) => {
  visited[i][j] = true;
  dfsVisited[i][j] = true;
  let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
  cell.style.backgroundColor = "lightblue";
  await colorPromise();

  for (
    let children = 0;
    children < graphComponentMatrix[i][j].length;
    children++
  ) {
    let [childRowId, childColId] = graphComponentMatrix[i][j][children];
    if (visited[childRowId][childColId] === false) {
      if (
        await traceCycleDFS(
          graphComponentMatrix,
          childRowId,
          childColId,
          visited,
          dfsVisited
        )
      ) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();

        return Promise.resolve(true);
      }
    } else if (
      visited[childRowId][childColId] === true &&
      dfsVisited[childRowId][childColId] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rowId="${childRowId}"][colId="${childColId}"]`
      );
      cyclicCell.style.backgroundColor = "lightsalmon";
      // adding timeout so that it waits for 1 sec
      await colorPromise();
      cyclicCell.style.backgroundColor = "transparent";
      await colorPromise();
      cell.style.backgroundColor = "transparent";
      return Promise.resolve(true);
    }
  }
  dfsVisited[i][j] = false;
  return Promise.resolve(false);
};
const traceCyclePath = async (graphComponentMatrix, cyclePosition) => {
  let [row, col] = cyclePosition;
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

  return await traceCycleDFS(
    graphComponentMatrix,
    row,
    col,
    visited,
    dfsVisited
  );

  return false;
};
