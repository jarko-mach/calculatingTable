"use strict";

import {
    infoReportsNamesRead,
    infoReportsNamesSave,
    saveTemporaryReportName,
    readTemporaryReportName,
    dataReportOriginal,
    operationIsDone
} from "../miscellaneous/misc.js";

import { dialogBox_chooseOldOrNewReport, dialogBox_readExistingReport } from "./main-dialog-boxes.js";

import { createMainMenu } from "./main-menu.js";


////// READ FULL REPORT

export const readOnlySomeOfReport = (reportName) => {
    saveTemporaryReportName(reportName)
    let dataReport = JSON.parse(localStorage.getItem(`"${reportName}"Report`));
    // console.log("1 name", reportName, "dane", dataReport)

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)

    const nodeList = document.querySelectorAll(myClasses)

    let nodeListCounter = 0
    for (let element in dataReport) {
        if (element === "id" || element === "tables") continue
        // console.log("element", element, "nodeList[currentLiczn].value", nodeList[currentLiczn].value)
        nodeList[nodeListCounter].value = dataReport[`${element}`]
        // console.log("2", dataReport.element)
        nodeListCounter++
    }

    // console.log(myClasses)
}

export const readAll = () => {
    dialogBox_readExistingReport()
}

////// READ FULL REPORT - END


////// SAVE FULL REPORT

const saveOnlySomeOfReport = () => {
    const nameOfReport = readTemporaryReportName()
    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)

    const nodeList = document.querySelectorAll(myClasses)
    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))
    // console.log("1", dataReport)
    let nodeListCounter = 0
    for (let element in dataReport) {
        if (element === "id" || element === "tables") continue
        // console.log("element", element, "nodeList[currentLiczn].value", nodeList[currentLiczn].value)
        dataReport[`${element}`] = nodeList[nodeListCounter].value
        // console.log("2", dataReport.element)
        nodeListCounter++
    }
    // console.log("2", dataReport)

    // element 8 - tables
    // dataReport.tables = nodeList[7].value
    // console.log("tabela:", dataReport)
    // console.log("JSON", JSON.stringify(dataReport))
    localStorage.setItem(`${nameOfReport}Report`, JSON.stringify(dataReport))
}

export const saveAll = () => {
    saveOnlySomeOfReport()
}

// SAVE FULL REPORT - END


//   START PROGRAM

dialogBox_chooseOldOrNewReport()
