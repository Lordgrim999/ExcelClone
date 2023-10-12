"use strict";

const updateChildrenNodes = (parentCellProp, childAddress) => {
  parentCellProp.children.add(childAddress);
};
const removeChildFromParent = oldExpression => {
  let childAddress = addressBar.value;
  let encodedFormula = oldExpression.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      const [cell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.delete(childAddress);
    }
  }
};
const evaluateExpression = (expression, address) => {
  let encodedFormula = expression.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      const [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);

      if (encodedFormula[i] !== address) {
        updateChildrenNodes(cellProp, address);
      }
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedValue = encodedFormula.join(" ");
  return eval(decodedValue);
};

const updateCellValueAndFormula = (value, formula, address) => {
  const [cell, cellProp] = getCellAndCellProp(address);
  cell.innerText = value;
  cellProp.value = value;
  cellProp.formula = formula;
};
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
    cell.addEventListener("blur", e => {
      let address = addressBar.value;
      const [activeCell, cellProp] = getCellAndCellProp(address);
      if (!activeCell.innerText) return;

      console.log("blurred", activeCell.innerText, cellProp.value);
      if (activeCell.innerText != cellProp.value) {
        cellProp.value = activeCell.innerText;
        // if data is changed for this cell update all it's children value
        updateChildrenCells(address);
        removeChildFromParent(cellProp.formula);
        cellProp.formula = "";
      }
    });
  }
}

const updateChildrenCells = parentAddress => {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let children = parentCellProp.children;
  console.log("parent address", parentAddress, parentCellProp);
  if (children.length == 0) return;
  for (let child of children) {
    let childAddress = child;

    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    console.log("child", childAddress, childCellProp);
    let evaluatedValue = evaluateExpression(
      childCellProp.formula,
      childAddress
    );
    updateCellValueAndFormula(
      evaluatedValue,
      childCellProp.formula,
      childAddress
    );
    updateChildrenCells(childAddress);
  }
};

const addChildToGraphComponent = (expression, childAddress) => {
  const [childRowId, childColId] = decodeIdFromAddress(childAddress);
  let encodedFormula = expression.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentRowId, parentColId] = decodeIdFromAddress(encodedFormula[i]);
      graphComponentMatrix[parentRowId][parentColId].push([
        childRowId,
        childColId,
      ]);
    }
  }
};

const removeRelationCausingCycle = expression => {
  let encodedFormula = expression.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentRowId, parentColId] = decodeIdFromAddress(encodedFormula[i]);
      graphComponentMatrix[parentRowId][parentColId].pop();
    }
  }
};
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async e => {
  if (e.key !== "Enter" || !formulaBar.value) return;

  let address = addressBar.value;
  const [activeCell, cellProp] = getCellAndCellProp(address);
  if (cellProp.formula && cellProp.formula !== formulaBar.value) {
    removeChildFromParent(cellProp.formula);
  }

  // adding the relationships for cycle detection and check if cycle exists
  addChildToGraphComponent(formulaBar.value, address);

  let cyclePosition = isCyclePresent(graphComponentMatrix);
  if (cyclePosition) {
    let response = confirm(
      "Your formula has cycle present. Do you want to trace the path?"
    );
    while (response === true) {
      await traceCyclePath(graphComponentMatrix, cyclePosition);
      response = confirm(
        "Your formula has cycle present. Do you want to trace the path?"
      );
    }
    removeRelationCausingCycle(formulaBar.value);
    return;
  }
  let evaluatedValue = evaluateExpression(formulaBar.value, address);
  updateCellValueAndFormula(evaluatedValue, formulaBar.value, address);
  console.log(cellProp);
  updateChildrenCells(address);
});
