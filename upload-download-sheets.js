let uploadBtn = document.querySelector(".upload");
let downloadBtn = document.querySelector(".download");

//download file
downloadBtn.addEventListener("click", e => {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix]);
  let file = new Blob([jsonData], { type: "application/json" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "SheetData.json";
  a.click();
});

//upload file
uploadBtn.addEventListener("click", e => {
  console.log("file started");
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change", e => {
    let fr = new FileReader();
    console.log("file started");
    let fileObj = input.files[0];
    fr.readAsText(fileObj);
    fr.addEventListener("load", e => {
      console.log("file loaded");
      let readSheetData = JSON.parse(fr.result);
      addSheetButton.click();
      sheetDB = readSheetData[0];
      graphComponentMatrix = readSheetData[1];
      collectedSheetDb[collectedSheetDb.length - 1] = sheetDB;
      collectedGraphComponent[collectedGraphComponent.length - 1] =
        graphComponentMatrix;
      handleSheetProperties();
    });
  });
});
