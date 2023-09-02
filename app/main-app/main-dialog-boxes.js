"use strict"

import {
    infoReportsNamesRead,
    infoReportsNamesSave,
    saveTemporaryReportName,
    readTemporaryReportName,
    dataReportOriginal,
    operationIsDone
} from "../miscellaneous/misc.js";

import { createMainTable, clearInfoInputIsEmpty } from "./main-table.js";
import { createMainMenu } from "./main-menu.js";
import { saveAll, readOnlySomeOfReport } from "./app.js";
import { createStandardTable } from "../table1-lighting/table1-create.js";
import { readAndDisplayAllAdedPoints, removeAllAddedPointsInHtml, reset_pointsAddedIntoCurrentReport } from "./main_points15.js";


////// CREATE NEW REPORT -----------------------------------------------------------------------------

export const dialogBox_startNewReport = () => {
    const header = "Utwórz nowe sprawozdanie";
    const labelString = "Podaj dowolną nazwę:";
    const commandType = "Utwórz";
    const wasNames = infoReportsNamesRead()

    const getOKButton = () => {
        const foundInputText = document.querySelector(".openDialogBox #fileName").value
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = ``
        infoReportsNamesSave(foundInputText)
        saveTemporaryReportName(foundInputText)
        createMainTable()
        createMainMenu()
        // debugger
        removeAllAddedPointsInHtml()
        reset_pointsAddedIntoCurrentReport()
        saveAll()
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
            return false
        } else {
            foundInput.classList.remove("inputError")
            foundButtonOK.disabled = false
            return true
        }
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")
    newElement.innerHTML =
        ` <div class="dialogBox wider300">
                <div class="dialogBoxHeader wider300" > ${header} 
                </div>
                
              <div class="dialogBoxChild dialogBoxChild_NewReport wider300">
                  <label for="fileName">${labelString}</label>
                  <input type="text" id="fileName" class="inputError input_NewReport" placeholder="co najmniej 5 znaków...">
              
                  <button class="okSave" disabled>${commandType}</button>
                  <button class="noCancel">Anuluj</button>
              </div>
              <div class="dialogBoxComment">
                <p>Czerwona obwódka świadczy o tym, że podana nazwa nie zostanie zaakceptowana. <br>
                Nazwa zostanie zakceptowana, gdy jednocześnie:<br>
                  – będzie dłuższa niż 4 znaki, <br>
                  – nie będzie zawierać kropki, <br>
                  – nie będzie zawierać przecinka, <br>
                  – nie będzie 2 spacji obok siebie, <br>
                  – no i nie będzie identyczna, jak nazwa utworzona wcześniej i zapisana lokalnie na dysku.</p>
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
    foundInput.addEventListener("keydown", e => {
        if (e.key === "Enter" && onChangeInput()) getOKButton()
    })
}

////// READ EXISTING REPORT  ------------------------------------------------------------------------------

export const dialogBox_readExistingReport = () => {

    const getOKButton = () => {
        const chosenReportName = document.querySelector(".openDialogBox #fileName").value
        // console.log("OK", chosenReportName)
        const foundElement = document.querySelector(".openDialogBox")
        // console.log("OK foundElement", foundElement)

        foundElement.innerHTML = ` `
        saveTemporaryReportName(chosenReportName)
        createMainTable()
        createMainMenu()
        readOnlySomeOfReport(chosenReportName)
        readAndDisplayAllAdedPoints()
        // clearInfoInputIsEmpty()
    }

    const getCancelButton = () => {
        const foundElement = document.querySelector(".openDialogBox")
        // console.log("CANCEL foundElement", foundElement)
        foundElement.innerHTML = `<div class="openDialogBox"></div>`
    }

    const wasNames = infoReportsNamesRead()

    if (!wasNames) {
        alert("Brak zapisanych sprawozdań")
        dialogBox_startNewReport()
        return
    }
    // console.log("wasNames", wasNames)

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    let selectText = `<select id="fileName">`
    wasNames.forEach((element, index) => { selectText += `<option value="${element}">${element}</option>` })
    selectText += `</select>`


    newElement.innerHTML =
        ` <div class="dialogBox">
            <div class="dialogBoxHeader wider200" > Przegląd istniejących sprawozdań
            </div>
            <div class="dialogBoxChild_OldReport wider200">
                <label for="fileName">Wybierz nazwę</label>
                ${selectText}
                <div>
                    <button class="okSave">Wczytaj</button>
                    <button class="noCancel">Anuluj</button>
                </div>        
            </div>
        </div>
      `
    foundElement.append(newElement)

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
}


////// START - CHOOSE REPORT - dialogBox_startNewReport()  or  dialogBox_readExistingReport()

export const dialogBox_chooseOldOrNewReport = () => {
    let whatNext = ""

    const getOKButton = () => {
        const radioGroupNewOrOld = document.querySelectorAll("input[name=insertNewOrOld]")
        for (const radio1 of radioGroupNewOrOld) {
            if (radio1.checked) {
                whatNext = radio1.value;
                break;
            }
        }
        getCancelButton();

        if (whatNext === "new") dialogBox_startNewReport()
        if (whatNext === "existing") dialogBox_readExistingReport()
    }

    const getCancelButton = () => {
        if (!whatNext) {
            const endingElement = document.querySelector(".entry")
            endingElement.innerHTML = `<p>Dziękuję za współpracę i do zobaczenia następnym razem</p>`
        }
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    newElement.innerHTML =
        ` 
        <div class="dialogBox">
            <div class="dialogBoxHeader"> Sprawozdanie
            </div>
            <div class="dialogBoxChild">
                <fieldset class="fieldsetWidth">
                    <legend>Wybierz:</legend>
                    <div class="inputDiv">
                        <input type="radio" id="insertNew" name="insertNewOrOld" value="new" checked>
                        <label for="insertNew">utwórz nowe sprawozdanie</label>
                    </div>
                    <div class="inputDiv">
                        <input type="radio" id="insertExisting" name="insertNewOrOld" value="existing">
                        <label for="insertExisting">pokaż listę zapisanych sprawozdań</label>
                    </div>
                </fieldset>
                <div class="btnLayout">
                    <button class="okSave">Dalej</button>
                    <button class="noCancel">Anuluj</button>
                </div>
            </div>
        </div>  
      `

    foundElement.append(newElement)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)
}



////// ADD TABLE INTO POINT 5  -------------------------------------------------------------------------------

export const dialogBox_point5_selectTableType = () => {
    let whatNext = ""

    const getOKButton = () => {
        const radioGroupStandardOrRescue = document.querySelectorAll("input[name=selectStandardOrRescue]")
        for (const radio1 of radioGroupStandardOrRescue) {
            if (radio1.checked) {
                whatNext = radio1.value;
                break;
            }
        }
        getCancelButton();
        if (whatNext === "standard") createStandardTable()
        if (whatNext === "rescue") alert("Na razie nie ma tej tabeli w opcjach programu...")
    }

    const getCancelButton = () => {
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    newElement.innerHTML =
        ` 
        <div class="dialogBox">
            <div class="dialogBoxHeader wider400"> Wybierz rodzaj tabeli
            </div>
            <div class="dialogBoxChild wider400">
                <fieldset class="fieldsetWidth wider200">
                    <legend>Utwórz / wstaw:</legend>
                    <div class="inputDiv">
                        <input type="radio" id="insertStandard" name="selectStandardOrRescue" value="standard" checked>
                        <label for="insertStandard">tabelę badania oświetlenia elektrycznego</label>
                    </div>
                    <div class="inputDiv">
                        <input type="radio" id="insertRescue" name="selectStandardOrRescue" value="rescue">
                        <label for="insertRescue">tabelę badania oświetlenia awaryjnego ewakuacyjnego</label>
                    </div>
                </fieldset>
                <div class="btnLayout wider200">
                    <button class="okSave">Dalej</button>
                    <button class="noCancel">Anuluj</button>
                </div>
            </div>
        </div>  
      `

    foundElement.append(newElement)

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
}
