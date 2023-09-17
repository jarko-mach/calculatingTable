

import { infoReportsNamesRead, infoReportsNamesSave, saveTemporaryReportName, reset_tempInformations } from "../miscellaneous/misc.js";
import { createMainTable } from "./create-main-table.js"
import { createMainMenu } from "./main-menu.js";
import { removeAllAddedPointsInHtml } from "../subpoints-1-5/points-1-5-remove.js"
import { saveReportAndTable } from "./save-report-and-table.js"


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
        reset_tempInformations()
        saveReportAndTable()
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

