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
    console.log("1 name", reportName, "dane", dataReport)

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)

    const nodeList = document.querySelectorAll(myClasses)

    let nodeListCounter = 0
    for (let element in dataReport) {
        // console.log("odczytuję element", element)
        if (element === "id") {
            // console.log("----znaleziono id");
            continue
        }
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
        if (nodeList[nodeListCounter].value.length > 45) nodeList[nodeListCounter].rows = Math.ceil(nodeList[nodeListCounter].value.length / 45)
        console.log("dodaje kolejne wiersze gdy tekst jest długi", dataReport.element)
        nodeListCounter++
    }
    console.log("koniec wczytywania, wyszła tabela:", tempInformations)
}

export const readAll = () => {
    dialogBox_readExistingReport()
}

////// READ FULL REPORT - END


////// SAVE REPORT AND TABLE

// BYŁO saveOnlySomeOfReport
export const saveReportAndTable = () => {

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)

    const nodeList = document.querySelectorAll(myClasses)

    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))
    // console.log("1", dataReport)

    const nameOfReport = readTemporaryReportName()

    let nodeListCounter = 0
    for (let element in dataReport) {

        if (element === "id") {
            dataReport[`${element}`] = Date.now()
            continue
        }

        if (element === "point1") {
            dataReport[`${element}`].created = tempInformations[1].created
            continue
        }
        if (element === "point2") {
            dataReport[`${element}`].created = tempInformations[2].created
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
            dataReport[`${element}`].created = tempInformations[5].created
            if (tempInformations[5].created) {
                let localTabNam = tempInformations[5].tableName
                dataReport[`${element}`].tableName = localTabNam
                saveTable(localTabNam)
            }
            continue
        }

        dataReport[`${element}`] = nodeList[nodeListCounter].value
        console.log("save raport - element", dataReport[`${element}`])
        nodeListCounter++
    }
    // console.log("2 saveOnlySomeOfReport - zapisuję dane:", dataReport)
    localStorage.setItem(`${nameOfReport}Report`, JSON.stringify(dataReport))
}

// SAVE REPORT AND TABLE - END


//   START PROGRAM

dialogBox_chooseOldOrNewReport()
