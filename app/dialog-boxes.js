import * as docx from "../node_modules/docx/build/index.js"
import { AlignmentType, HeadingLevel } from "../node_modules/docx/build/index.js";

import {
  infoTablesNamesSave,
  infoTablesNamesRead,
  saveReport,
  saveTable,
  operationIsDone,
  readDoc,
  readReport,
  saveTemporaryTableReportName,
  readTemporaryTableReportName
} from "./app.js"

import { setButtonsEnabledDisabled } from "./menu-btn-dscr-check.js";

////// DIALOG BOXES 

// FILE NEW

export const fileNew = () => {
  const header = "Utwórz nowe sprawozdanie wraz z tabelą do ";
  const labelString = "Zapisz jako";
  const commandType = "Zapisz";
  const wasNames = infoTablesNamesRead()

  const getOKButton = () => {
    const foundInputText = document.querySelector(".openDialogBox #fileName").value
    console.log("OK", foundInputText)
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
    infoTablesNamesSave(foundInputText)
    saveReport(foundInputText)
    saveTable(foundInputText)
    saveTemporaryTableReportName(foundInputText)
    setButtonsEnabledDisabled("tableNew")
    operationIsDone()
    // console.log(tableButtonsInfo)
  }

  const getCancelButton = () => {
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
  }

  const onChangeInput = () => {
    const foundInput = document.querySelector(".openDialogBox #fileName")
    const foundInputText = foundInput.value
    const re1 = /(\s\s+)|[\.\,\;\*\{\[\}\]\}]|[.,;]$/i   //* szukam błędów we wpisach pomiarów
    let foundError = re1.test(foundInputText)
    // console.log("wasNames", wasNames)

    for (let i = 0; i < wasNames.length; i++) {
      if (wasNames[i] === foundInputText) {
        foundError = true;
        alert("Taka nazwa już istnieje");
      }
    }

    let foundButtonOK = document.querySelector(".openDialogBox .okSave")

    if (foundError || foundInputText.length < 5) {
      foundInput.classList.add("inputError")
      foundButtonOK.disabled = true
    } else {
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
                <input type="text" id="fileName" placeholder="co najmniej 5 znaków...">
            
                <button class="okSave" disabled>${commandType}</button>
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

// FILE SAVE

export const fileSave = () => {
  const lastName = readTemporaryTableReportName()
  let localName
  if (lastName.startsWith(`"`)) {
    localName = lastName.substring(1, lastName.length - 1)
    // console.log("zapisuję...", localName)
  }
  saveTable(localName)
  saveReport(localName)
  alert(`Sprawozdanie ${localName} zostało zapisane`);
}


// FILE READ

export const fileRead = () => {

  const getOKButton = () => {
    const foundInputText = document.querySelector(".openDialogBox #fileName").value
    // console.log("OK", foundInputText)
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
    readDoc(foundInputText)
    readReport(foundInputText)
    saveTemporaryTableReportName(foundInputText)
    // infoTablesNamesSave(foundInputText)
    // saveReport(foundInputText)
    // saveTable(foundInputText)
    setButtonsEnabledDisabled("tableReaded")
    operationIsDone()
    // console.log(tableButtonsInfo)
  }

  const getCancelButton = () => {
    const foundElement = document.querySelector(".openDialogBox")
    foundElement.innerHTML = `<div class="openDialogBox"></div>`
  }

  const wasNames = infoTablesNamesRead()
  if (!wasNames) { alert("Brak zapisanych sprawozdań"); return }
  // console.log("wasNames", wasNames)

  const foundElement = document.querySelector(".openDialogBox")
  const newElement = document.createElement("div")
  newElement.classList.add("dialogBoxParent")

  let selectText = `<select id="fileName">`
  wasNames.forEach((element, index) => { selectText += `<option value="${element}">${element}</option>` })
  selectText += `</select>`


  newElement.innerHTML =
    ` <div class="dialogBox">
            <div class="dialogBoxHeader" > Przegląd istniejących sprawozdań
            </div>
            <div class="dialogBoxChild">
                <label for="fileName">Wybierz nazwę</label>
                ${selectText}
                <button class="okSave">Wczytaj</button>
                <button class="noCancel">Anuluj</button>
            </div>
          </div>
    `
  foundElement.append(newElement)

  const foundButtonOK = document.querySelector(".openDialogBox .okSave")
  foundButtonOK.addEventListener("click", getOKButton)

  const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
  foundButtonCancel.addEventListener("click", getCancelButton)
}

// EXPORT WORD DOCUMENT

export const exportDocument = () => {

  const paragraph_title = new docx.Paragraph({
    text: "BADANIA OŚWIETLENIA ELEKTRYCZNEGO",
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
  })

  const paragraph2 = new docx.Paragraph({
    text: "Tu powinno coś być w niedługim czasie :)",
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
  });

  const paragraphEmpty = new docx.Paragraph({
    text: "",
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
  });

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [paragraph_title, paragraphEmpty, paragraph2]
      }
    ]
  });

  docx.Packer.toBlob(doc).then((blob) => {
    console.log("blob", blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
}

function generate() {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun("Badania oświetlenia elektrycznego"),
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

