"use strict";

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
    tables: ["tabela1"],
}

let dataTableOriginal = [
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
let dataTableLocal = []

// w sytuacji kilku tabel każda ma inną nazwę, stąd aktualna/bierząca nazwa tabeli nad którą pracujemy
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

// aktualnie aktywny Raport

export const saveTemporaryReportName = (repName) => {
    localStorage.setItem(`tempRepName`, JSON.stringify(repName))
    // console.log("zapis do temp.", tabRepName)
}

export const readTemporaryReportName = () => {
    let repName = localStorage.getItem(`tempRepName`)
    // console.log("odczyt z temp.", tabRepName)
    return repName
}

// aktualnie aktywne tabela

const _saveTemporaryReportTableName = (tabRepName) => {
    localStorage.setItem(`tempTabName`, JSON.stringify(tabRepName))
    // console.log("zapis do temp.", tabRepName)
}

const _readTemporaryReportTableName = () => {
    let tabRepName = localStorage.getItem(`tempTabName`)
    // console.log("odczyt z temp.", tabRepName)
    return tabRepName
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
    debugger
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
    console.log("localNames", localNames)
    if (names) {
        console.log("jest kilka tablic", names[0].reportName)
        return localNames
    } else {
        console.log("nie ma tablic")
        return ""
    }
}

// zapamiętuje utworzone tabele lokalnie

let info_TablesNames = [{
    creatingDate: "333",
    tableName: "444",
    tableSuffix: "Table",
    reportSuffix: "Report",
}]


const _infoTablesNamesSave = (nameOfTable) => {
    let oldNames = JSON.parse(localStorage.getItem("infoTablesNames"));
    const infoJsonString = JSON.parse(JSON.stringify(infoTableName))
    if (!oldNames) { oldNames = [] }
    oldNames.push(...infoJsonString)
    oldNames[oldNames.length - 1].creatingDate = new Date()
    oldNames[oldNames.length - 1].tableName = nameOfTable
    localStorage.setItem(`infoTablesNames`, JSON.stringify(oldNames))
}

const _infoTablesNamesRead = () => {
    const names = JSON.parse(localStorage.getItem("infoTablesNames"));
    let localNames = []
    if (names?.length) {
        names.forEach((element, index) => { localNames.push(element.tableName) })
    }
    // console.log("localNames", localNames)
    if (names) {
        // console.log("jest kilka tablic", names[0].tableName)
        return localNames
    } else {
        // console.log("nie ma tablic")
        return ""
    }
}


// OPERATION IS DONE

export const operationIsDone = () => {
    const element = document.querySelector(".confElement")
    // console.log(element)
    element.classList.add("confElementChange")
    setTimeout(() => {
        element.classList.remove("confElementChange")
        // console.log("element", element, element.classList)
    }, 400)
    // console.log(e.pageY, e.pageX)
}

export const readPositionOfMouse = (e) => {
    // console.log("xxx ", e.pageY)
    // const element = document.querySelector(".footerDescription5")
    return `${-30 + e.pageX}px`
    // element.style.top = `${-30 + e.pageX}px`
}
