"use strict";
// creating cell properties storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProps = {
      isBold: false,
      isItalic: false,
      isUnderlined: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000000",
      BGColor: "#000000",
      value: "",
      formula: "",
      children: new Set(),
    };
    sheetRow.push(cellProps);
  }
  sheetDB.push(sheetRow);
}

const decodeIdFromAddress = address => {
  const rowId = Number(address.slice(1)) - 1;
  const colId = Number(address.charCodeAt(0)) - 65;

  return [rowId, colId];
};

const getCellAndCellProp = address => {
  const [rowId, colId] = decodeIdFromAddress(address);

  // selecting cell and storage
  let cell = document.querySelector(
    `.cell[rowId="${rowId}"][colId="${colId}"]`
  );
  let cellProp = sheetDB[rowId][colId];
  return [cell, cellProp];
};

// selectors for cell props
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".background-color-prop");
let leftAlignElem = alignment[0];
let centeAlignElem = alignment[1];
let rightAlignElemt = alignment[2];

let activeColorProp = "#d1d8e0";
// application for two-way-binding of cell with props
// attach property listener

bold.addEventListener("click", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.bold = !cellProp.bold; // change the data
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // change the representation of cell
  bold.style.backgroundColor = cellProp.bold ? activeColorProp : "";
});

italic.addEventListener("click", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.italic = !cellProp.italic; // change the data
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // change the representation of cell
  italic.style.backgroundColor = cellProp.italic ? activeColorProp : "";
});

underline.addEventListener("click", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.underline = !cellProp.underline; // change the data
  cell.style.textDecoration = cellProp.underline ? "underline" : ""; // change the representation of cell
  underline.style.backgroundColor = cellProp.underline ? activeColorProp : "";
});

fontSize.addEventListener("change", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontSize = fontSize.value; // change the data
  cell.style.fontSize = cellProp.fontSize + "px"; // change the representation of cell
});

fontFamily.addEventListener("change", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontFamily = fontFamily.value; // change the data
  cell.style.fontFamily = cellProp.fontFamily; // change the representation of cell
});

fontColor.addEventListener("change", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);
  console.log(fontColor.value);
  cellProp.fontColor = fontColor.value; // change the data
  cell.style.color = cellProp.fontColor; // change the representation of cell
});

BGColor.addEventListener("change", e => {
  let address = addressBar.value;
  if (!address) return;
  const [cell, cellProp] = getCellAndCellProp(address);

  cellProp.BGColor = BGColor.value; // change the data
  cell.style.backgroundColor = cellProp.BGColor; // change the representation of cell
});

alignment.forEach(alignElem => {
  alignElem.addEventListener("click", e => {
    let address = addressBar.value;
    if (!address) return;
    const [cell, cellProp] = getCellAndCellProp(address);
    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; // change the data
    cell.style.textAlign = alignValue;
    switch (alignValue) {
      case "left":
        leftAlignElem.style.backgroundColor = activeColorProp;
        centeAlignElem.style.backgroundColor = "";
        rightAlignElemt.style.backgroundColor = "";
        break;
      case "center":
        leftAlignElem.style.backgroundColor = "";
        centeAlignElem.style.backgroundColor = activeColorProp;
        rightAlignElemt.style.backgroundColor = "";
        break;
      case "right":
        leftAlignElem.style.backgroundColor = "";
        centeAlignElem.style.backgroundColor = "";
        rightAlignElemt.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

//adding event listener to each cell to update cell props

const addListenerToCell = cell => {
  cell.addEventListener("click", e => {
    let address = addressBar.value;
    if (!address) return;
    const [rowId, colId] = decodeIdFromAddress(address);
    const cellProp = sheetDB[rowId][colId];

    //applying properties to cell value
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.textAlign = cellProp.alignment;

    //applying active/inactive class to cell props
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : "";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : "";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : "";
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch (cellProp.alignment) {
      case "left":
        leftAlignElem.style.backgroundColor = activeColorProp;
        centeAlignElem.style.backgroundColor = "";
        rightAlignElemt.style.backgroundColor = "";
        break;
      case "center":
        leftAlignElem.style.backgroundColor = "";
        centeAlignElem.style.backgroundColor = activeColorProp;
        rightAlignElemt.style.backgroundColor = "";
        break;
      case "right":
        leftAlignElem.style.backgroundColor = "";
        centeAlignElem.style.backgroundColor = "";
        rightAlignElemt.style.backgroundColor = activeColorProp;
        break;
    }

    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value;
  });
};
let cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
  addListenerToCell(cells[i]);
}
