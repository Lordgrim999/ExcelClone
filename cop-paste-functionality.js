let ctrlKey = false;
let copyData = [];
let copyButton = document.querySelector(".copy");
let pasteButton = document.querySelector(".paste");
let cutButton = document.querySelector(".cut");
let selectedRange = [];

document.addEventListener("keydown", e => {
  ctrlKey = e.ctrlKey;
});
document.addEventListener("keyup", e => {
  ctrlKey = e.ctrlKey;
});

const removeSelectedCellUi = () => {
  console.log(selectedRange);
  for (let i = 0; i < selectedRange.length; i++) {
    let cell = document.querySelector(
      `.cell[rowId="${selectedRange[i][0]}"][colId="${selectedRange[i][1]}"]`
    );
    cell.style.borderRight = "1px solid color(srgb 0.7529 0.7529 0.753)";
    cell.style.borderTop = "none";
    cell.style.borderLeft = "none";
    cell.style.borderBottom = "1px solid color(srgb 0.7529 0.7529 0.753)";
  }
};

const handleSelectedCell = cell => {
  cell.addEventListener("click", e => {
    // handle range selection

    if (!ctrlKey) return;

    if (selectedRange.length >= 2) {
      removeSelectedCellUi();
      selectedRange = [];
    }
    let rowId = Number(cell.getAttribute("rowId"));
    let colId = Number(cell.getAttribute("colId"));
    selectedRange.push([rowId, colId]);
    cell.style.border = "2px solid #218c74";
  });
};

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
    handleSelectedCell(cell);
  }
}

// copying elements
copyButton.addEventListener("click", e => {
  copyData = [];
  for (let i = selectedRange[0][0]; i <= selectedRange[1][0]; i++) {
    let copyRow = [];
    for (let j = selectedRange[0][1]; j <= selectedRange[1][1]; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  removeSelectedCellUi();
});

//pasting date
pasteButton.addEventListener("click", e => {
  if (selectedRange.length < 2) return;
  console.log(copyData);
  let rowDiff = Math.abs(selectedRange[1][0] - selectedRange[0][0]);
  let colDiff = Math.abs(selectedRange[1][1] - selectedRange[0][1]);
  let targetCellAdress = addressBar.value;
  let [targetRow, targetCol] = decodeIdFromAddress(targetCellAdress);
  for (let i = targetRow, r = 0; i <= targetRow + rowDiff; i++, r++) {
    for (let j = targetCol, c = 0; j <= targetCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
      if (cell) {
        console.log(copyData[r][c].value);
        sheetDB[i][j] = { ...copyData[r][c] };

        cell.click();
      }
    }
  }
});

cutButton.addEventListener("click", e => {
  let rowDiff = Math.abs(selectedRange[1][0] - selectedRange[0][0]);
  let colDiff = Math.abs(selectedRange[1][1] - selectedRange[0][1]);
  let targetCellAdress = addressBar.value;
  let [targetRow, targetCol] = decodeIdFromAddress(targetCellAdress);
  for (let i = targetRow, r = 0; i <= targetRow + rowDiff; i++, r++) {
    for (let j = targetCol, c = 0; j <= targetCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
      if (cell) {
        let cellProp = sheetDB[i][j];
        cellProp.isBold = false;
        cellProp.isItalic = false;
        cellProp.isUnderlined = false;
        cellProp.alignment = "left";
        cellProp.fontFamily = "monospace";
        cellProp.fontSize = "14";
        cellProp.fontColor = "#000000";
        cellProp.BGColor = "white";
        cellProp.value = "";
        cell.click();
      }
    }
  }
  removeSelectedCellUi();
});
