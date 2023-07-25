import { saveReport, saveTable, operationIsDone } from "./app.js"

// DIALOG BOXES 

const showDialogBox = (header, labelString, commandType, function1, function2, function3) => {

  const getOKButton = () => {
    const foundInputText = document.querySelector(".openDialogBox #fileName").value
    // console.log("OK", foundInputText)
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
    function1(foundInputText);
    function2(foundInputText);
    function3(foundInputText);
  }

  const getCancelButton = () => {
    // console.log("Cancel")
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
  }

  const onChangeInput = () => {
    const foundInput = document.querySelector(".openDialogBox #fileName")
    const foundInputText = foundInput.value
    const re1 = /(\s\s+)|[\.\,\;\*\{\[\}\]\}]|[.,;]$/i   //* szukam błędów we wpisach pomiarów
    const foundError = re1.test(foundInputText)

    let foundButtonOK = document.querySelector(".openDialogBox .okSave")
    console.log("foundButtonOK.classList", foundButtonOK.classList)

    if (foundError) {
      console.log("foundError", foundError)
      foundInput.classList.add("inputError")
      foundButtonOK.disabled = true
    } else {
      console.log("foundError", foundError)
      foundInput.classList.remove("inputError")
      foundButtonOK.disabled = false
    }
  }

  const foundElement = document.querySelector(".openDialogBox")
  const newElement = document.createElement("div")
  newElement.classList.add("dialogBoxParent")
  newElement.innerHTML =
    ` <div class="dialogBox">
            <div class="dialogBoxHeader" > ${header}
            </div>
            <div class="dialogBoxChild">
                <label for="fileName">${labelString}</label>
                <input type="text" id="fileName">
            
                <button class="okSave">${commandType}</button>
                <button class="noCancel">Anuluj</button>
            </div>
          </div>
    `
  foundElement.append(newElement)

  const foundButtonOK = document.querySelector(".openDialogBox .okSave")
  foundButtonOK.addEventListener("click", getOKButton)

  const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
  foundButtonCancel.addEventListener("click", getCancelButton)

  const foundInput = document.querySelector(".openDialogBox input")
  foundInput.focus()
  // console.log("foundInput", foundInput)
  foundInput.addEventListener("input", onChangeInput)
}

export const fileNew = () => {
  showDialogBox("Utwórz nową tabelę do sprawozdania", "Zapisz jako", "Zapisz", saveReport, saveTable, operationIsDone)
}

export const fileSave = () => {
  const answer = showDialogBox("Zapis danych", "Podaj nazwę pliku", "Zapisz")
}

export const fileSaveAs = () => {
  const answer = showDialogBox("Zapis danych", "Zapisz jako", "Zapisz")
}




// EXPORT WORD DOCUMENT

export function generate() {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun("BADANIA OŚWIETLENIA ELEKTRYCZNEGO"),
              new docx.TextRun({
                text: "Foo Bar",
                bold: true
              }),
              new docx.TextRun({
                text: "\tGithub is the best",
                bold: true
              })
            ]
          })
        ]
      }
    ]
  });

  docx.Packer.toBlob(doc).then((blob) => {
    console.log("blob", blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
}


