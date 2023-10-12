let addSheetButton = document.querySelector(".sheet-add-icon");
let collectedSheetDb = [];
let collectedGraphComponent = [];
let sheetDB = [];
let graphComponentMatrix = [];
addSheetButton.addEventListener("click", e => {
  let newSheet = document.createElement("div");
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  let sheetContainer = document.querySelector(".sheet-folder-container");
  newSheet.setAttribute("class", "sheet-folder");
  newSheet.setAttribute("id", allSheetFolder.length);
  newSheet.innerHTML = `<div class="sheet">sheet ${
    allSheetFolder.length + 1
  }</div>`;
  sheetContainer.appendChild(newSheet);
  newSheet.scrollIntoView();
  createSheetDb();
  createGraphComponentMatrix();

  handleActiveSheetDb(newSheet);
  handleSheetRemoval(newSheet);
  newSheet.click();
});

const handleActiveSheetUI = newSheet => {
  let allSheets = document.querySelectorAll(".sheet-folder");
  for (let sheet of allSheets) sheet.style.backgroundColor = "transparent";
  newSheet.style.backgroundColor = "#ced6e0";
};
const handleSheetRemoval = sheet => {
  sheet.addEventListener("mousedown", e => {
    if (e.button !== 2) return;

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You need to have atleast two sheets to remove!");
      return;
    }
    let sheetIdx = Number(sheet.getAttribute("id"));
    let response = confirm(
      `Are you sure you want to delete sheet ${sheetIdx + 1}`
    );
    if (response === false) return;
    //DB removal
    collectedSheetDb.splice(sheetIdx, 1);
    collectedGraphComponent.splice(sheetIdx, 1);
    //UI removal
    sheet.remove();
    // by default make sheet 1 active
    allSheetFolders[0].click();
  });
};
const createSheetDb = () => {
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
  collectedSheetDb.push(sheetDB);
};

const createGraphComponentMatrix = () => {
  let graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponent.push(graphComponentMatrix);
};

const handleSheetProperties = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".cell");
  firstCell.click();
};

const handleActiveSheetDb = sheet => {
  sheet.addEventListener("click", e => {
    let sheetIdx = Number(sheet.getAttribute("id"));
    sheetDB = collectedSheetDb[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
    handleSheetProperties();
    handleActiveSheetUI(sheet);
  });
};
