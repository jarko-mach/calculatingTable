

import { createMainTable } from "../menu/main-table.js"
import { createMainMenu } from "../menu/main-menu.js"
import { dataReportOriginal, tempInformations, infoReportsNamesRead, saveTemporaryReportName } from "../miscellaneous/misc.js"
import { readAndDisplayAllAdedPoints } from "../../subpoints-1-5/points-1-5-create.js"


export const localMemory_readReport = (reportName) => {

    saveTemporaryReportName(reportName)
    let dataReport = JSON.parse(localStorage.getItem(`${reportName}Report`));
    console.log("1 name", reportName, "dane", dataReport)

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    console.log("foundClasses", foundClasses)
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)
    console.log("myClasses", myClasses)
    const nodeList = document.querySelectorAll(myClasses)

    console.log("readed nodeList", nodeList)
    // debugger
    let nodeListCounter = 0
    for (let element in dataReport) {
        // console.log("odczytuję element", element)
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
        nodeList[nodeListCounter].value = dataReport[`${element}`]
        if (dataReport[`${element}`]) { nodeList[nodeListCounter].classList.remove("fieldToFill") }
        if (nodeList[nodeListCounter].value.length > 45) nodeList[nodeListCounter].rows = Math.ceil(nodeList[nodeListCounter].value.length / 45)
        // console.log("22 dodaje kolejne wiersze gdy tekst jest długi", dataReport[`${element}`])
        nodeListCounter++
    }
    console.log("koniec wczytywania, wyszła tabela:", tempInformations)
}



export const dialogBox_chooseExistingReport = () => {

    const getOKButton = () => {
        const chosenReportName = document.querySelector(".openDialogBox #fileName").value
        console.log("Odczytuję raport:", chosenReportName)
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

