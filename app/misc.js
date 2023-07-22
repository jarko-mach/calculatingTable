
// import * as dell from "https://unpkg.com/docx@7.1.0/build/index.js"
// <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>

import { Document, Paragraph, TextRun, Packer } from "../node_modules/docx/build/index.js"
// import { saveAs } from "../node_modules/file-saver/src/FileSaver.js"

// console.log(dell)

const showDialogBox = (header, labelString, commandType) => {

    const getOKButton = () => {
        const foundInputText = document.querySelector(".openDialogBox #fileName").value
        // console.log("OK", foundInputText)
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = `<div class="openDialogBox"></div>`
    }

    const getCancelButton = () => {
        // console.log("Cancel")
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = `<div class="openDialogBox"></div>`
    }

    const onChangeInput = () => {
        const foundInput = document.querySelector(".openDialogBox #fileName")
        const foundInputText = foundInput.value
        const re1 = /(\s\s+)|[\.\,\;\*\/\{\[\}\]\}]|[.,;]$/i   //* szukam błędów we wpisach pomiarów
        const foundError = re1.test(foundInputText)
        if (foundError) {
            foundInput.classList.add("inputError")
        } else { foundInput.classList.remove("inputError") }
        // console.log("zmiana, czy błęnie?", foundError)
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

export const fileSave = () => {
    const answer = showDialogBox("Zapis danych", "Podaj nazwę pliku", "Zapisz")
}

export const fileSaveAs = () => {
    const answer = showDialogBox("Zapis danych", "Zapisz dane jako", "Zapisz")
}


// EXPORT

export function generate() {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun("Hello World"),
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
    console.log("blob",blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
}


