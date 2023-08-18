"use strict";

import {
    infoTablesNamesSave,
    infoTablesNamesRead,
    saveReport,
    saveTable,
    operationIsDone,
    // readDoc,
    // readReport,
    saveTemporaryTableReportName,
    // readTemporaryTableReportName
} from "./app.js"


// FILE NEW 

const etap1_FileNew = () => {
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
        operationIsDone()
        etap1_Start()
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
        ` <div class="dialogBox">
                <div class="dialogBoxHeader" > ${header} 
                </div>
                
              <div class="dialogBoxChild">
                  <label for="fileName">${labelString}</label>
                  <input type="text" id="fileName" class="inputError" placeholder="co najmniej 5 znaków...">
              
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

const etap1_DisplayDialogbox = () => {
    let whatNext = ""

    const getOKButton = () => {
        const radioGroupNewOrOld = document.querySelectorAll("input[name=insertNewOrOld]")
        for (const radio1 of radioGroupNewOrOld) {
            if (radio1.checked) {
                whatNext = radio1.value;
                // console.log("whatNext",whatNext)
                break;
            }
        }
        getCancelButton();
        if (whatNext === "new") etap1_FileNew()
    }

    const getCancelButton = () => {
        if (!whatNext) {
            const endingElement = document.querySelector(".badania")
            endingElement.innerHTML = `<p>Dziękuję za współpracę i do zobaczenia następnym razem</p>`
        }
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent_Select")

    newElement.innerHTML =
        ` 
        <div class="dialogBox_Select">
            <div class="dialogBoxHeader_Select"> Sprawozdanie
            </div>
            <div class="dialogBoxChild_Select">
                <fieldset class="selectNarrow_Select">
                    <legend>Wybierz:</legend>
                    <div class="input_Select">
                        <input type="radio" id="insertNew" name="insertNewOrOld" value="new" checked>
                        <label for="insertNew">utwórz nowe sprawozdanie</label>
                    </div>
                    <div class="input_Select">
                        <input type="radio" id="insertExisting" name="insertNewOrOld" value="existing">
                        <label for="insertExisting">pokaż listę zapisanych sprawozdań</label>
                    </div>
                </fieldset>
                <div class="btnLayout_Select">
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

const etap1_Start = () => {
    const foundElement = document.querySelector(".badania")
    console.log("foundElement", foundElement)

    const newDiv1 = document.createElement("div")
    newDiv1.classList.add("badania_E2")

    foundElement.replaceWith(newDiv1)
    newDiv1.innerHTML =
        `
            <p> SPRAWOZDANIE NUMER TSO /
            <input type="text" class="numberTSO"> / 
            <input type="text" class="yearTSO">
            </p>
        `
    const newDiv2 = document.createElement("div")
    newDiv2.classList.add("badania_E2")
    newDiv2.innerHTML =
        `
         <span>Badania oświetlenia elektrycznego</span>
        `
    newDiv1.after(newDiv2)

    const newDiv3 = document.createElement("div")
    newDiv3.innerHTML = `

        <div class="customerGrid">
            <p class="customerLabel">Nazwa i adres Klienta:</p>
            <textarea id="customerName" class="castomerInput" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Miejsce wykonania badań:</p>
            <textarea id="researchAddress" class="castomerInput" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Badane czynniki:</p>
            <textarea id="factorsTested" class="castomerInput" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Sporządził/a i autoryzował/a:</p>
            <textarea id="complied" class="castomerInput" rows="1"></textarea>
        </div>

        <table class="tableSummary">
          <tbody>
            <tr>
                <td>
                    <p class="customerLabel">Data wykonania badań:</p>
                    <input id="researchDate" class="castomerInput" type="text">
                </td>
                <td>
                    <p class="customerLabel">Data sporządzenia sprawozdania:</p>
                    <input id="reportDate" class="castomerInput" type="text">
                </td>
                <td>
                    <p class="customerLabel">Egzemplarz sprawozdania:</p>
                    <input id="copyReportNumber" class="castomerInput" type="text">
                </td>
                <td>
                    <p class="customerLabel">Łączna liczba stron sprawozdania:</p>
                    <input id="allPages" class="castomerInput" type="text">
                </td>
            </tr>
          </tbody>
        </table>
        `
    newDiv2.after(newDiv3)

}

//   START PROGRAM

etap1_DisplayDialogbox()

// etap2_Start()