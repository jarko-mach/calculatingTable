import { showHideMenuDescriptions, addMenuButtons, addHelpToMenu, prepareToPrint, addMenuCheckboxes, addMenuCheckboxesDescriptions } from "./menu-btn-dscr-check.js"
import { tableAddNumbers, tableAddTextBoldLine, tableAddTextLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine, checkboxRemoveTableRowChanged, addFirstThreeColumnsHeader } from "./table-operations.js"
// import { dataTableTemp } from "./misc.js"

// import { checkToStartNewPage } from "./next-page.js"

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

// classy dla różnych wierszy tabeli
export const classTableRows = ["rowTextBold", "rowText", "rowThinLine", "rowDate", "rowEmpty"]

// classy dla różnych kolumn tabeli
let classTableColumns = ["numberLp", "place", "measurings", "wynik-1", "norma-1", "wynik-2", "norma-2", "compatibility"]
let classTableAll = [...classTableRows, ...classTableColumns]

export const convertClassesIntoOneString = (myTable) => {
    let readClasses = ""
    myTable.forEach((value, index) => {
        readClasses = (index <= myTable.length - 2) ? readClasses += `.${value}, ` : readClasses += `.${value}`
    })
    return readClasses
}

// RECALCULATING

export const recalcAll = function (e) {
    let eksploatacionCalculated
    let eksploatacionNorm
    let uniformityCalculated  //Rownomiernosc
    let uniformityNorm

    // console.log("zaczynam przeliczać...")

    // wczytuję classy dla kolumn
    let readedClasses = convertClassesIntoOneString(classTableColumns)
    const nodeList = document.querySelectorAll(readedClasses)
    // console.log("trafione punkty do obliczeń:", nodeList)

    // wczytuję classy dla wierszy tabeli
    readedClasses = convertClassesIntoOneString(classTableRows)
    const rowsNumber = document.querySelectorAll(readedClasses).length
    // console.log("liczba wierszy:", rowsNumber)

    const re1 = /(\d\s+\d)|[a-z]|([,;]\s+)$|[,]$/i   //* szukam błędów we wpisach pomiarów
    const re2 = /[,;]/gi        //* przecinek lub średnik stanowi powód do splitowania dla kolumny measurings
    const re3 = /[a-z]/i      // szukam liter w kolumnach [5] i [7]
    let foundError = false

    for (let row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 8
        // console.log("Jeśli to kolejny rząd, to zwiększam i o:", addRowElements)

        //  kolumna nr 3 – odczytuję pomiary -----------------------------------------------------------------
        let measurementsRow = nodeList[2 + addRowElements].value
        // console.log("wiersz", row, "pomiary w stringu:", measurementsRow)

        foundError = re1.test(measurementsRow)
        // console.log("czy znaleziono zabroniony znak?", foundError)

        if (foundError) {
            // console.log("bum")
            nodeList[2 + addRowElements].classList.add("measuringsError")
            nodeList[3 + addRowElements].value = ""
            nodeList[3 + addRowElements].classList.remove("measuringsToLow")
            nodeList[5 + addRowElements].value = ""
            nodeList[5 + addRowElements].classList.remove("measuringsToLow")
            nodeList[7 + addRowElements].value = "????"
            foundError = false
            continue
        } else {
            nodeList[2 + addRowElements].classList.remove("measuringsError")
        }

        const measurementsRowTable = measurementsRow.split(re2);
        // console.log("efekt polecenia split", measurementsRowTable)

        measurementsRowTable.forEach((elem, index) => { measurementsRowTable[index] = Number(measurementsRowTable[index]) })
        // console.log("zamiana na Number", measurementsRowTable)

        const computeEksploatacyjne = () => {
            let sum = 0
            measurementsRowTable.forEach((value, index) => { sum += value })

            eksploatacionCalculated = Number(Math.round(sum / measurementsRowTable.length + 'e+0') + 'e-0')
            return eksploatacionCalculated
        }

        // console.log(" obliczona suma wyników pomiarów", computeEksploatacyjne())

        // brak danych liczbowych
        // kolumna nr 8 - Tak/Nie
        // nodeList[7 + addRowElements].value = "????"

        if (!computeEksploatacyjne()) {
            // console.log("WYPAD: brak danych")
            continue
        }

        // kolumna nr 4  -----------------------------------------------------------------
        nodeList[3 + addRowElements].value = computeEksploatacyjne()

        // kolumna nr 5 - norma / sprawdzić czy jest wpisane cokolwiek a jeśli tak, to czy nie są to bzdurki ----------------
        eksploatacionNorm = Number(nodeList[4 + addRowElements].value)

        console.log("eksploatacionNorm", eksploatacionNorm)

        foundError = re3.test(eksploatacionNorm)
        console.log("foundError", foundError)

        // brak danych liczbowych
        // kolumna nr 8 - Tak/Nie
        nodeList[7 + addRowElements].value = "????"

        if (foundError || eksploatacionNorm === 0) {
            nodeList[4 + addRowElements].classList.add("measuringsError")
            // console.log("WYPAD: dziwne dane")
            continue
        } else {
            nodeList[4 + addRowElements].classList.remove("measuringsError")
        }
        // console.log("wpisane", eksploatacionNorm, "number", Number(eksploatacionNorm))

        // kolumna nr 6 - oblicz równomierność ------------------------------------------------
        uniformityCalculated
            = Number(Math.round(Math.min(...measurementsRowTable) / eksploatacionCalculated + 'e+2') + 'e-2')

        nodeList[5 + addRowElements].value = String(uniformityCalculated).replace('.', ',')

        // kolumna nr 7 – norma równomierność / sprawdzić czy jest wpisane cokolwiek a jeśli tak, to czy nie są to bzdurki ---------------
        uniformityNorm = Number(String(nodeList[6 + addRowElements].value).replace(',', '.'))

        // console.log("uniformityNorm", uniformityNorm)

        foundError = re3.test(uniformityNorm)
        // console.log("foundError", foundError)

        // brak danych liczbowych
        // kolumna nr 8 - Tak/Nie
        nodeList[7 + addRowElements].value = "????"

        if (foundError || uniformityNorm === 0) {
            nodeList[6 + addRowElements].classList.add("measuringsError")
            // console.log("WYPAD: dziwne?? dane")
            continue
        } else {
            nodeList[6 + addRowElements].classList.remove("measuringsError")
        }

        // kolumna nr 8 - Tak/Nie
        nodeList[7 + addRowElements].value = "????"

        // console.log("skoro tu jesteś, to są poprawne wyniki")

        // console.log("co wyszło:", eksploatacionCalculated, eksploatacionNorm, uniformityCalculated, uniformityNorm)

        let measurmentsEksploatacionOk = true
        let measurmentsUniformityOk = true

        if (eksploatacionNorm !== "") {
            if (eksploatacionCalculated >= eksploatacionNorm) {
                nodeList[3 + addRowElements].classList.remove("measuringsToLow")
                measurmentsEksploatacionOk = true
            } else {
                nodeList[3 + addRowElements].classList.add("measuringsToLow")
                measurmentsEksploatacionOk = false
            }
        }

        if (uniformityNorm !== "") {
            if (uniformityCalculated >= uniformityNorm) {
                nodeList[5 + addRowElements].classList.remove("measuringsToLow")
                measurmentsUniformityOk = true
            } else {
                nodeList[5 + addRowElements].classList.add("measuringsToLow")
                measurmentsUniformityOk = false
            }
        }

        if (measurmentsEksploatacionOk && measurmentsUniformityOk) {
            nodeList[7 + addRowElements].value = "TAK"
        } else {
            nodeList[7 + addRowElements].value = "NIE"
        }
    }
}

// SAVE READ

let correctMeasurments = (dataString) => {
    // console.log("zaczynam korektę zapisu", dataString, "ilosc znakow:", Boolean(dataString.length))

    if (dataString.length > 0) {
        // dopisuję spację za średnikiem
        let re = ";";
        dataString = dataString.replaceAll(re, "; ");
        // zamieniam dwie i więcej spacji na jedną spację
        re = /\s+/g;
        dataString = dataString.replaceAll(re, " ");
        // tworzę tablicę szukając przecinka lub średnika
        re = /[;,]/;
        let myTable = dataString.split(re);
        // console.log("a co tu mamy:", myTable)
        myTable.forEach((elem, index) => {
            // console.log("index", index, "zawartosc", myTable[index])
            if (Number(myTable[index])) {
                myTable[index] = Number(myTable[index])
            } else alert("Znaleziono błąd w zapisie wyników")
        })
        // console.log("a co to wyszło:", myTable)
        return myTable.join("; ")
    } else return ""
}


// SAVING DATA

export const saveTable = (nameOfTable) => {

    function localStorageTest() {           // ----------------------------------------------------------
        const test = "test" + new Date().valueOf();
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // odczytuję liczbę wierszy zapisanej tabeli
    let readedClassesFromTable = convertClassesIntoOneString(classTableRows)
    const rowsNumber = document.querySelectorAll(readedClassesFromTable).length
    // console.log("powinien być strong", readedClassesFromTable, "liczba wierszy zapisu", rowsNumber)

    // zwiększam tabelę z danymi o liczbę wierszy
    while (dataTableLocal.length < rowsNumber) {
        dataTableJsonS = JSON.parse(JSON.stringify(dataTableOriginal))
        dataTableLocal.push(...dataTableJsonS)
    }

    // odczytuję liczbę wszystkich elementów tabeli wraz z typem wiersza
    readedClassesFromTable = convertClassesIntoOneString(classTableAll)
    let nodeList = document.querySelectorAll(readedClassesFromTable)
    // console.log("liczba elementów:", nodeList.length)
    // console.log("rodzaj elementów:", nodeList)

    for (let row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 9
        // console.log("Dodaję elementów:", addRowElements)

        // element 1 - rodzaj wiersza
        dataTableLocal[row].typeOfRow = nodeList[0 + addRowElements].className

        //jeżeli jest to cienka linia, to pomijamy resztę wpisów
        if (nodeList[0 + addRowElements].className !== "rowThinLine") {

            // element 2 - lp
            dataTableLocal[row].info.numberLp = nodeList[1 + addRowElements].value

            // element 3 - miejsce pomiarów
            dataTableLocal[row].info.place = nodeList[2 + addRowElements].value

            // element 4 - pomiary
            dataTableLocal[row].info.measurings = correctMeasurments(nodeList[3 + addRowElements].value)

            // element 5 - eksploatacyjne wynik
            dataTableLocal[row].info.wynik1 = nodeList[4 + addRowElements].value

            // element 6 - eksploatacyjne norma 
            dataTableLocal[row].info.norma1 = nodeList[5 + addRowElements].value

            // element 7 - rownomiernosc pomiary
            dataTableLocal[row].info.wynik2 = nodeList[6 + addRowElements].value

            // element 8 - rownomiernosc norma
            dataTableLocal[row].info.norma2 = nodeList[7 + addRowElements].value

            // element 9 - zgodnosc
            dataTableLocal[row].info.compatibility = nodeList[8 + addRowElements].value
        }
    }
    console.log("tabela:", dataTableLocal)
    console.log("JSON", JSON.stringify(dataTableLocal))
    localStorage.setItem(`${nameOfTable}Table`, JSON.stringify(dataTableLocal))
}

// SAVE REPORT

// let report = [
//     {
//         id: 1,
//         numberTSO: 111,
//         year: 2023,
//         page: 1,
//         pages: 11,
//         customer: "P.H.U",
//         placeOfMeasurings: "Hurtownie",
//         dateOfMeasurings: Date(),
//         tables: ["tabela1"],
//     }
// 


export const saveReport = (nameOfReport) => {

    // classy użyte do nagłówka i danych klienta
    const tableThreeColumns = ["numberTSO", "yearTSO", "pageTSO", "pagesTSO"]

    let readedClassesFromTable = convertClassesIntoOneString(tableThreeColumns)
    console.log("readedClassesFromTable", readedClassesFromTable)

    const findCustomerAndDate = `, #customerName, #researchAddress, #researchDate`
    readedClassesFromTable += findCustomerAndDate
    const nodeList = document.querySelectorAll(readedClassesFromTable)


    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))

    // element 1 - numberTSO
    dataReport.numberTSO = nodeList[0].value

    // element 2 - year
    dataReport.year = nodeList[1].value

    // element 3 - page
    dataReport.page = nodeList[2].value

    // element 4 - pages
    dataReport.pages = nodeList[3].value

    // element 5 - customer
    dataReport.customer = nodeList[4].value

    // element 6 - placesof 
    dataReport.placeOfMeasurings = nodeList[5].value

    // element 7 - date
    dataReport.dateOfMeasurings = nodeList[6].value

    // element 8 - tables
    // dataReport.tables = nodeList[7].value
    console.log("tabela:", dataReport)
    console.log("JSON", JSON.stringify(dataReport))
    localStorage.setItem(`${nameOfReport}Report`, JSON.stringify(dataReport))
}




// READING DATA

const removeAllNewRows = () => {
    let elementsToRemove = convertClassesIntoOneString(classTableRows)
    const elements = document.querySelectorAll(elementsToRemove)
    // console.log("usuwando", elements)
    elements.forEach((elem) => { elem.remove() })
}

export const readDoc = () => {
    removeAllNewRows()
    let dataTable = JSON.parse(localStorage.getItem("myElement"))
    // console.log("długość wczytywanej tablicy", dataTable.length)
    // console.log("wczytujemy:", dataTable)

    for (let i = 0; i < dataTable.length; i++) {
        if (dataTable[i].typeOfRow === "rowTextBold") { tableAddTextBoldLine() }
        if (dataTable[i].typeOfRow === "rowText") { tableAddTextLine() }
        if (dataTable[i].typeOfRow === "rowDate") { tableAddDataLine() }
        if (dataTable[i].typeOfRow === "rowEmpty") { tableAddEmptyLine() }
        if (dataTable[i].typeOfRow === "rowThinLine") { tableAddThinLine() }
    }

    let readedClassesFromTable = convertClassesIntoOneString(classTableAll)
    let nodeList = document.querySelectorAll(readedClassesFromTable)
    // console.log("liczba elementów:", nodeList.length)
    // console.log("tabela:", dataTable)
    // console.log("elementy:", nodeList)

    for (let row = 0; row < dataTable.length; row++) {

        let addRowElements = row * 9

        // element 0 - typ wiersza

        // element 1 - lp
        nodeList[1 + addRowElements].value = dataTable[row].info.numberLp

        // element 2 - miejsce pomiarów
        nodeList[2 + addRowElements].value = dataTable[row].info.place
        nodeList[2 + addRowElements].rows = Math.ceil(dataTable[row].info.place.length / 45)

        // element 3 - pomiary
        nodeList[3 + addRowElements].value = dataTable[row].info.measurings
        nodeList[3 + addRowElements].rows = Math.ceil(dataTable[row].info.measurings.length / 35)

        // element 4 - eksploatacyjne wynik
        nodeList[4 + addRowElements].value = dataTable[row].info.wynik1

        // element 5 - eksploatacyjne norma 
        nodeList[5 + addRowElements].value = dataTable[row].info.norma1

        // element 6 - rownomiernosc pomiary
        nodeList[6 + addRowElements].value = dataTable[row].info.wynik2.replace('.', ',')

        // element 7 - rownomiernosc norma
        nodeList[7 + addRowElements].value = dataTable[row].info.norma2

        // element 8 - zgodnosc
        nodeList[8 + addRowElements].value = dataTable[row].info.compatibility

    }
    // checkToStartNewPage()
}

export const readReport = () => {

    let dataReport = JSON.parse(localStorage.getItem("myReport"));

    // classy użyte do nagłówka i danych klienta
    const tableThreeColumns = ["numberTSO", "yearTSO", "pageTSO", "pagesTSO"]
    let readedClassesFromTable = convertClassesIntoOneString(tableThreeColumns)
    // console.log("readedClassesFromTable", readedClassesFromTable)

    const findCustomerAndDate = `, #customerName, #researchAddress, #researchDate`
    readedClassesFromTable += findCustomerAndDate
    const nodeList = document.querySelectorAll(readedClassesFromTable)
    // console.log("nodeList", nodeList)

    // element 1 - numberTSO
    nodeList[0].value = dataReport.numberTSO

    // element 2 - year
    nodeList[1].value = dataReport.year

    // element 3 - page
    nodeList[2].value = dataReport.page

    // element 4 - pages
    nodeList[3].value = dataReport.pages

    // element 5 - customer
    nodeList[4].rows = 1
    let myRegExp = /\n/ig
    let ifTrue
    do {
        ifTrue = myRegExp.test(dataReport.customer)
        if (!ifTrue) break
        nodeList[4].rows++
    } while (ifTrue)

    nodeList[4].value = dataReport.customer

    // element 6 - placesof 
    nodeList[5].rows = 1
    do {
        ifTrue = myRegExp.test(dataReport.placeOfMeasurings)
        if (!ifTrue) break
        nodeList[5].rows++
    } while (ifTrue)

    nodeList[5].value = dataReport.placeOfMeasurings

    // element 7 - date
    nodeList[6].value = dataReport.dateOfMeasurings

    // element 8 - tables
    // dataReport.tables = nodeList[7].value
}


// SHOWING GREY BACKGROUND 

const checkboxGreyBackgroundChanged = () => {
    let checkBoxState = document.querySelector("#addGreyBackground")
    // console.log("stan cheku", checkBoxState.checked)

    const classesToFind = convertClassesIntoOneString(classTableColumns)
    // console.log("classy do znalezienia", classesToFind)

    const element = document.querySelectorAll(classesToFind)
    // console.log("lista elementów", element)

    if (checkBoxState.checked) {
        element.forEach((element, index) => {
            if (!element.disabled) {
                element.classList.add("addGreyBackground")
                // console.log(index)
            }
        })
    } else {
        element.forEach((element, index) => {
            if (!element.disabled) {
                element.classList.remove("addGreyBackground")
                // console.log(index)
            }
        })
    }

}

// OPERATION IS DONE

export const operationIsDone = () => {
    const element = document.querySelector(".confElement")
    element.classList.add("confElementChange")
    setTimeout(() => {
        element.classList.remove("confElementChange")
        // console.log("element", element, element.classList)
    }, 400)
    // console.log(e.pageY, e.pageX)
}

export const readPositionOfMouse = (e) => {
    // console.log("xxx ", e.pageY)
    // const element = document.querySelector(".footerDisplayDescription5")
    return `${-30 + e.pageX}px`
    // element.style.top = `${-30 + e.pageX}px`
}


// START

tableAddNumbers()
addFirstThreeColumnsHeader()
addMenuButtons()
addHelpToMenu()
addMenuCheckboxes()
checkboxGreyBackgroundChanged()

// document.querySelector("#showDescriptions").checked = true
// document.querySelector("#addGreyBackground").disabled = true
// document.querySelector("#removeTableRow").disabled = true

showHideMenuDescriptions()

// document.querySelector("body").addEventListener("mouseover", readPositionOfMouse)
document.querySelector(".table1Text").addEventListener("click", prepareToPrint)
document.querySelector("#removeTableRow").addEventListener("click", checkboxRemoveTableRowChanged)
document.querySelector("#addGreyBackground").addEventListener("click", checkboxGreyBackgroundChanged)
document.querySelector("#showDescriptions").addEventListener("click", showHideMenuDescriptions)

