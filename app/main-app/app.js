"use strict";

import {
    infoTablesNamesRead,
    infoTablesNamesSave,
    saveTemporaryTableReportName,
    operationIsDone
} from "../miscellaneous/misc.js";

import { createMainMenu } from "./main-menu.js";

import { createNewStandardTable } from "../table-lighting/table-create.js";

// FILE NEW 

export const startNewReport = () => {
    const header = "Utwórz nowe sprawozdanie";
    const labelString = "Podaj dowolną nazwę:";
    const commandType = "Utwórz";
    const wasNames = infoTablesNamesRead()

    const getOKButton = () => {
        const foundInputText = document.querySelector(".openDialogBox #fileName").value
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = ``
        infoTablesNamesSave(foundInputText)
        saveTemporaryTableReportName(foundInputText)
        createMainTable()
        createMainMenu()
        operationIsDone()
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
        } else {
            foundInput.classList.remove("inputError")
            foundButtonOK.disabled = false
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
}

// FILE READ

const etap1_FileRead = () => {

    const getOKButton = () => {
        const foundInputText = document.querySelector(".openDialogBox #fileName").value
        // console.log("OK", foundInputText)
        const foundElement = document.querySelector(".openDialogBox")
        // console.log("OK foundElement", foundElement)

        foundElement.innerHTML = ` `
        debugger
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
        // console.log("CANCEL foundElement", foundElement)
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

// STARTING DIALOG BOX

const chooseOldOrNewReport = () => {
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
        if (whatNext === "new") startNewReport()
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

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
}

const createMainTable = () => {

    const removeFieldToFill = (e) => {
        console.log("fieldToFill: e", e)
        e.target.classList.remove("fieldToFill")
    }

    const foundElement = document.querySelector(".entry")
    // console.log("foundElement", foundElement)
    foundElement.innerHTML =
        `<div class="reportTitle">
            <p> SPRAWOZDANIE NUMER TSO /
            <input type="text" class="numberTSO fieldToFill"> / 
            <input type="text" class="yearTSO fieldToFill">
            </p>
        </div>
        <div  class="reportTitle">
            <span>Badania oświetlenia elektrycznego</span>
        </div>
        <div class="customerGrid">
            <p class="customerLabel">Nazwa i adres Klienta:</p>
            <textarea id="customerName" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Miejsce wykonania badań:</p>
            <textarea id="researchAddress" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Badane czynniki:</p>
            <textarea id="factorsTested" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Sporządził/a i autoryzował/a:</p>
            <textarea id="complied" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <table class="tableSummary">
          <tbody>
            <tr>
                <td>
                    <p class="customerLabel">Data wykonania badań:</p>
                    <input id="researchDate" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Data sporządzenia sprawozdania:</p>
                    <input id="reportDate" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Egzemplarz sprawozdania:</p>
                    <input id="copyReportNumber" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Łączna liczba stron sprawozdania:</p>
                    <input id="allPages" class="castomerInput fieldToFill" type="text">
                </td>
            </tr>
          </tbody>
        </table>
        `
    foundElement.addEventListener("change", removeFieldToFill)
}


// ADD TABLE FOR POINT 5

export const point5_selectTableType = () => {
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
        if (whatNext === "standard") createNewStandardTable(1)
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

// const startNewTableStandard = () => {
//     createNewStandardTable()
// }

//   START PROGRAM

chooseOldOrNewReport()
// createMainTable()
// showMainMenu()

// createNewStandardTable(1)
// selectTable()
