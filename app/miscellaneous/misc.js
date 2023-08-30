"use strict";

let dataReportOriginal = {
    id: 1,
    numberTSO: 111,
    year: 2023,
    page: 1,
    pages: 11,
    customer: "P.H.U",
    placeOfMeasurings: "Hurtownie",
    dateOfMeasurings: Date(),
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

// w sytuacji kilku tabel każda ma inną nazwę, stąd aktualna/bierząca nazwa tabeli nad któą pracujemy
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

// aktualnie aktywne sprawozdanie

export const saveTemporaryTableReportName = (tabRepName) => {
    localStorage.setItem(`tempTabName`, JSON.stringify(tabRepName))
    // console.log("zapis do temp.", tabRepName)
}

export const readTemporaryTableReportName = () => {
    let tabRepName = localStorage.getItem(`tempTabName`)
    // console.log("odczyt z temp.", tabRepName)
    return tabRepName
}

// zapamiętuje utworzone nazwy sprawozdań lokalnie

let infoTableName = [{
    creatingDate: "333",
    tableName: "444",
    tableSuffix: "Table",
    reportSuffix: "Report",
}]

export const infoTablesNamesSave = (nameOfTable) => {
    let oldNames = JSON.parse(localStorage.getItem("infoTablesNames"));
    const infoJsonString = JSON.parse(JSON.stringify(infoTableName))
    if (!oldNames) { oldNames = [] }
    oldNames.push(...infoJsonString)
    oldNames[oldNames.length - 1].creatingDate = new Date()
    oldNames[oldNames.length - 1].tableName = nameOfTable
    localStorage.setItem(`infoTablesNames`, JSON.stringify(oldNames))
}

export const infoTablesNamesRead = () => {
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
    console.log(element)
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
