"use strict";

import {
    infoReportsNamesRead,
    infoReportsNamesSave,
    saveTemporaryReportName,
    readTemporaryReportName,
    // readTemporaryTableName,
    // saveTemporaryTableName,
    dataReportOriginal
} from "../miscellaneous/misc.js";

import { dialogBox_chooseOldOrNewReport, dialogBox_readExistingReport } from "./main-dialog-boxes.js";
import { tempInformations } from "../miscellaneous/misc.js";
import { saveTable } from "../table5a-lighting/table5a-operations.js";


////// READ FULL REPORT

export const localMemory_readReport = (reportName) => {

    // saveTemporaryReportName(reportName)
    let dataReport = JSON.parse(localStorage.getItem(`${reportName}Report`));
    // console.log("1 name", reportName, "dane", dataReport)

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
        if (element === "id") {
            // console.log("----znaleziono id");
            continue
        }
        if (element === "point1") {
            tempInformations[1].created = dataReport[`${element}`].created

            // dataReport[`${element}`].text1_1 = document.querySelector("#point11Text").textContent
            // dataReport[`${element}`].text1_2 = document.querySelector("#point12Text").textContent
            // dataReport[`${element}`].text1_3 = document.querySelector("#point13Text")?.textContent

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
    // console.log("koniec wczytywania, wyszła tabela:", tempInformations)
}

export const readAll = () => {
    dialogBox_readExistingReport()
}

////// READ FULL REPORT - END


////// SAVE REPORT AND TABLE

export const saveReportAndTable = () => {

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)
    console.log("zapisuję raport i tablicę, klasy:", myClasses)
    const nodeList = document.querySelectorAll(myClasses)

    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))

    // console.log("saveReportAndTable - ...", dataReport)

    const nameOfReport = readTemporaryReportName()

    let nodeListCounter = 0
    for (let element in dataReport) {

        if (element === "id") {
            dataReport[`${element}`] = Date.now()
            continue
        }

        if (element === "point1") {
            dataReport[`${element}`].created = tempInformations[1].created
            if (tempInformations[1].created) {
                dataReport[`${element}`].text1_1 = document.querySelector("#point11Text").value
                dataReport[`${element}`].text1_2 = document.querySelector("#point12Text").value
                dataReport[`${element}`].text1_3 = document.querySelector("#point13Text")?.value

            }
            continue
        }
        if (element === "point2") {
            if (tempInformations[2].created) {
                dataReport[`${element}`].created = tempInformations[2].created
                dataReport[`${element}`].text2 = document.querySelector("#point2Text").value
            }
            continue
        }
        if (element === "point3") {
            dataReport[`${element}`].created = tempInformations[3].created
            continue
        }
        if (element === "point4") {
            dataReport[`${element}`].created = tempInformations[4].created
            continue
        }
        if (element === "point5") {
            console.log("zapisuję raport punkt 5")
            dataReport[`${element}`].created = tempInformations[5].created
            console.log("i dalej...", dataReport[`${element}`].created)
            if (tempInformations[5].created) {
                let localTabNam = tempInformations[5].tableName
                dataReport[`${element}`].tableName = localTabNam
                console.log("nazwa taleli: ", localTabNam)
                saveTable(localTabNam)
            }
            continue
        }

        dataReport[`${element}`] = nodeList[nodeListCounter].value

        // console.log("save raport - element", dataReport[`${element}`])

        nodeListCounter++
    }
    // console.log("2 saveOnlySomeOfReport - zapisuję dane:", dataReport)
    localStorage.setItem(`${nameOfReport}Report`, JSON.stringify(dataReport))
}

// SAVE REPORT AND TABLE - END



//   START PROGRAM

dialogBox_chooseOldOrNewReport()
