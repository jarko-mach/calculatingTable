"use strict";

import { saveReportAndTable } from "../main-app/main-save-report.js"

export let dataReportOriginal = {
    id: 1,
    numberTSO: 111,
    yearTSO: 2023,
    customerName: "P.H.U",
    researchAddress: "Hurtownie",
    factorsTested: "something",
    complied: "Maja",
    researchDate: Date(),
    reportDate: Date(),
    copyReportNumber: 1,
    allPages: 11,
    point1: {
        created: false,
        text1_1: "",
        text1_2: "",
        text1_3: ""
    },
    point2: {
        created: false,
        text2: ""
    },
    point3: { created: false, tableName: "" },
    point4: { created: false, tableName: "" },
    point5: {
        created: false,
        tableName: ""
    },

}

export let dataTableOriginal = [
    {
        typeOfRow: "",
        info: {
            numberLp: "",
            place: "",
            measurings: "",
            wynik1: "",
            norma1: "",
            wynik2: "",
            norma2: "",
            compatibility: "",
        },
    }
]
let dataTableJsonS
export let dataTableLocal = []

// w sytuacji kilku tabel każda ma inną nazwę, stąd aktualna/bieżąca nazwa tabeli nad którą pracujemy
export const currentTablNam = []

// classy dla różnych wierszy tabeli
export const classTableRows = ["rowTextBold", "rowText", "rowThinLine", "rowDate", "rowEmpty"]

// classy dla różnych kolumn tabeli
export const classTableColumns = ["numberLp", "place", "measurings", "wynik-1", "norma-1", "wynik-2", "norma-2", "compatibility"]
export const classTableAll = [...classTableRows, ...classTableColumns]

export const convertClassesIntoOneString = (myTable) => {
    let readClasses = ""
    myTable.forEach((value, index) => {
        readClasses = (index <= myTable.length - 2) ? readClasses += `.${value}, ` : readClasses += `.${value}`
    })
    return readClasses
}

// informacje przechowywane lokalnie przed zapisem do Raportu

export const tempInformations = [
    { reportName: "" },
    { created: false, tableName: "" },
    { created: false, tableName: "" },
    { created: false, tableName: "" },
    { created: false, tableName: "" },
    { created: false, tableName: "" }
]

export const reset_tempInformations = () => {
    for (let locIndeks = 1; locIndeks < tempInformations.length; locIndeks++) {
        tempInformations[locIndeks].created = false
        tempInformations[locIndeks].tableName = ""
    }
    // console.log("reset", tempInformations)
}

export const saveTemporaryReportName = (repName) => {
    tempInformations[0].reportName = repName
    // console.log("zapis do temp. reportu", repName)
}

export const readTemporaryReportName = () => {
    const repName = tempInformations[0].reportName
    // console.log("odczyt z temp.", repName)
    return repName
}

// zapamiętuje utworzone nazwy sprawozdań lokalnie

let info_ReportsNames = [{
    creatingDate: "333",
    reportName: "444",
}]

export const infoReportsNamesSave = (nameOfReport) => {
    let oldNames = JSON.parse(localStorage.getItem("infoReportsNames"));
    // console.log(oldNames)
    const temporaryObject = JSON.parse(JSON.stringify(info_ReportsNames))
    if (!oldNames) { oldNames = [] }
    oldNames.push(...temporaryObject)

    oldNames[oldNames.length - 1].creatingDate = new Date()
    oldNames[oldNames.length - 1].reportName = nameOfReport
    localStorage.setItem(`infoReportsNames`, JSON.stringify(oldNames))
}

export const infoReportsNamesRead = () => {
    const names = JSON.parse(localStorage.getItem("infoReportsNames"));
    // const names = localStorage.getItem("infoReportsNames")
    // console.log(names.length)

    let localNames = []
    if (names?.length) {
        names.forEach((element, index) => { localNames.push(element.reportName) })
    }
    // console.log("localNames", localNames)
    if (names) {
        // console.log("jest kilka tablic", names[0].reportName)
        return localNames
    } else {
        // console.log("nie ma tablic")
        return ""
    }
}


// OPERATION IS DONE

export const operationIsDone_andSaveAll = () => {
    const element = document.querySelector(".confElement")
    // console.log("element", element)

    element.classList.add("confElementChange")
    setTimeout(() => {
        element.classList.remove("confElementChange")
        // console.log("element", element, element.classList)
    }, 700)
    // console.log(e.pageY, e.pageX)
    saveReportAndTable()
}

export const readPositionOfMouse = (e) => {
    // console.log("xxx ", e.pageY)
    // const element = document.querySelector(".footerDescription5")
    return `${-30 + e.pageX}px`
    // element.style.top = `${-30 + e.pageX}px`
}

// testing sort 

const myTestingSort = () => {
    const tab = [23, 27, 111, 4, 2]
    function compareNumbers(a, b) { return b - a }
    console.log(tab.sort(compareNumbers))
}


// TYPICAL DATA FOR NORMS

export const dataForm1 = [1500, 750, 500, 300, 200]