"use scrict"

import { createMainTable } from "../menu/main-table.js"
import { createMainMenu } from "../menu/main-menu.js"
import { dataReportOriginal, tempInformations, infoReportsNamesRead, saveTemporaryReportName } from "../../miscellaneous/misc.js"
import { readAndDisplayAllAdedPoints } from "../../points-all/points-all-read-from-report.js"
import { dialogBox_startNewReport } from "./dialogBox-new-name-report.js"

export const localMemory_readReport = (reportName) => {

    saveTemporaryReportName(reportName)

    let dataReport = JSON.parse(localStorage.getItem(`${reportName}Report`));
    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)
    const nodeList = document.querySelectorAll(myClasses)

    let nodeListCounter = 0
    for (let element in dataReport) {
        if (element === "id") { continue }
        if (element === "point1") {
            tempInformations[1].created = dataReport[`${element}`].created
            continue
        }
        if (element === "point2") {
            tempInformations[2].created = dataReport[`${element}`].created
            continue
        }
        if (element === "point3") {
            tempInformations[3].created = dataReport[`${element}`].created
            continue
        }
        if (element === "point4") {
            tempInformations[4].created = dataReport[`${element}`].created
            continue
        }
        if (element === "point5") {
            tempInformations[5].created = dataReport[`${element}`].created
            if (tempInformations[5].created) {
                tempInformations[5].tableName = dataReport[`${element}`].tableName
            }
            continue
        }
        if (element === "point7") {
            tempInformations[7].created = dataReport[`${element}`].created
            continue
        }
        nodeList[nodeListCounter].value = dataReport[`${element}`]
        if (dataReport[`${element}`]) { nodeList[nodeListCounter].classList.remove("fieldToFill") }

        let findN = nodeList[nodeListCounter].value.matchAll(/\n/g)
        let findNCounter = [...findN].length
        let extraLines = (findNCounter === 0) ? 0 : findNCounter
        let longTextLines = (nodeList[nodeListCounter].value.length > 35) ? Math.ceil(nodeList[nodeListCounter].value.length / 35) : 1
        nodeList[nodeListCounter].rows = extraLines + longTextLines
        // console.log("dodano wierszy", nodeList[nodeListCounter].rows)
        // console.log("22 dodaje kolejne wiersze gdy tekst jest długi", dataReport[`${element}`])
        nodeListCounter++
    }
    // console.log("koniec wczytywania, wyszła tabela:", tempInformations)
}

export const dialogBox_chooseExistingReport = () => {

    const getOKButton = () => {
        const chosenReportName = document.querySelector(".openDialogBox #fileName").value
        // console.log("Odczytuję raport:", chosenReportName)
        const foundElement = document.querySelector(".openDialogBox")
        // console.log("OK foundElement", foundElement)

        foundElement.innerHTML = ` `
        saveTemporaryReportName(chosenReportName)
        createMainTable()
        createMainMenu()
        // debugger
        localMemory_readReport(chosenReportName)
        readAndDisplayAllAdedPoints(chosenReportName)
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
    // console.log("selectText", selectText)

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

