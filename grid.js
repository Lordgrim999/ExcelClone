"use strict";
const rows = 100;
const cols = 26;
const addListenerForAddressBarDisplay = (cell, i, j) => {
  cell.addEventListener("click", e => {
    let rowId = i + 1;
    let colId = String.fromCharCode(65 + j);
    let addressId = `${colId}${rowId}`;
    addressBar.value = addressId;
  });
};

let addressBar = document.querySelector(".address-bar");
let addressColContainer = document.querySelector(".address-col-container");
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container");

//address col creation
for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColContainer.appendChild(addressCol);
}

//address row creation
for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowContainer.appendChild(addressRow);
}

//address grid creation
for (let i = 0; i < rows; i++) {
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "row");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");

    //storage for cell and storage identification
    cell.setAttribute("rowId", i);
    cell.setAttribute("colId", j);
    addListenerForAddressBarDisplay(cell, i, j);
    rowContainer.appendChild(cell);
  }
  cellsContainer.appendChild(rowContainer);
}
