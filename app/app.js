import { checkboxShowHideChanged } from "./btn-show-hide-description.js"
import { tableAddNumbers, removeTableRow, checkboxRemoveTableRowChanged } from "./table-operations.js"

let dataTableOriginal = [
    {
        typeOfRow: "B",
        info: {
            numberLp: 11,
            place: "B",
            measurings: "111",
            wynik1: 111,
            norma1: 111,
            wynik2: 111,
            norma2: 111,
            compatibility: "B",
        }
    }
]
let dataTableJsonS
let dataTableLocal = []

// classy dla różnych wierszy
let classTableRows = ["rowTextBold", "rowText", "rowThinLine", "rowDate"]

// classy dla różnych kolumn
let classTableColumns = ["numberLp", "place", "measurings", "wynik-1", "norma-1", "wynik-2", "norma-2", "compatibility"]

let classTableAll = [...classTableRows, ...classTableColumns]

const convertClassesIntoOneString = (myTable) => {
    let readClasses = ""
    myTable.forEach((value, index) => {
        readClasses = (index <= myTable.length - 2) ? readClasses += `.${value}, ` : readClasses += `.${value}`
    })
    return readClasses
}


export const showAllHidden = function () {
    // console.log("pokazuj")
    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    const rowsNumber = document.querySelectorAll(".addedLine").length
    // console.log(rowsNumber)

    for (let row = 0; row < rowsNumber; row++) {
        let addRowElements = row * 6
        for (let i = 0; i < 6; i++) {
            nodeList[i + addRowElements].style.visibility = "visible"
        }
    }
}

export const recalcAll = function (e) {
    let calculatedEksploatacyjne
    let normaEksploatacyjne
    let calculatedRownomiernosc
    let normaRownomiernosc

    console.log("zaczynam przeliczać...")

    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    console.log("trafione punkty do obliczeń:", nodeList)
    a = classTableColumns
    const rowsNumber = document.querySelectorAll(".rowThinLine, .rowDate, .rowText").length
    console.log("liczba wierszy:", rowsNumber)

    for (let row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 6
        // console.log("Jeśli to kolejny rząd, to zwiększam i o:", addRowElements)

        // wybieram pięć pierwszych elementów
        // element 0 i obliczam element 1 – oblicz eksploatacyjne
        let measurings = nodeList[0 + addRowElements].value

        const re = /[;,]/;
        let measureTable = measurings.split(re);
        measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })
        // console.log("22", measureTable)
        const computeEksploatacyjne = () => {
            let average = 0
            measureTable.forEach((elem) => { average += elem })
            calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
            return calculatedEksploatacyjne
        }

        // brak danych liczbowych
        if (!computeEksploatacyjne()) {

            for (let i = 0; i < 6; i++) {
                nodeList[i + addRowElements].style.visibility = "hidden"
            }
            // console.log("brak danych, zwiększono i o liczbę:", addRowElements)
            continue
        }

        nodeList[1 + addRowElements].value = computeEksploatacyjne()

        // element 2 - norma
        normaEksploatacyjne = nodeList[2 + addRowElements].value

        // element 3 - oblicz równomierność
        calculatedRownomiernosc
            = Number(Math.round(Math.min(...measureTable) / calculatedEksploatacyjne + 'e+2') + 'e-2')

        nodeList[3 + addRowElements].value = calculatedRownomiernosc

        // element 4 – norma równomierność
        normaRownomiernosc = nodeList[4 + addRowElements].value

        // element 5 - Tak/Nie
        nodeList[5 + addRowElements].value = "????"

        if (normaEksploatacyjne && normaRownomiernosc) {

            if (calculatedEksploatacyjne > normaEksploatacyjne && calculatedRownomiernosc > normaRownomiernosc) {
                nodeList[5 + addRowElements].value = "TAK"
            } else nodeList[5 + addRowElements].value = "NIE"
        }
    }
}

// SAVE READ
let correctMeasurments = (dataString) => {
    console.log("zaczynam korektę zapisu", dataString, "ilosc znakow:", Boolean(dataString.length))

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
            console.log("index", index, "zawartosc", myTable[index])
            if (Number(myTable[index])) {
                myTable[index] = Number(myTable[index])
            } else alert("Znaleziono błąd w zapisie wyników")
        })
        // console.log("a co to wyszło:", myTable)
        return myTable.join("; ")
    } else return ""
}

export const saveDoc = () => {

    // odczytuję liczbę wierszy zapisanej tabeli
    let readedClassesFromTable = convertClassesIntoOneString(classTableRows)
    const rowsNumber = document.querySelectorAll(readedClassesFromTable).length
    console.log("powinien być strong", readedClassesFromTable, "liczba wierszy zapisu", rowsNumber)

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
    localStorage.setItem("myElement", JSON.stringify(dataTableLocal))
}

const removeAllNewRows = () => {
    let elementsToRemove = convertClassesIntoOneString(classTableRows)
    const elements = document.querySelectorAll(elementsToRemove)
    console.log("usuwando", elements)
    elements.forEach((elem) => { elem.remove() })
}

export const readDoc = () => {
    removeAllNewRows()
    let dataTable = JSON.parse(localStorage.getItem("myElement"));
    console.log("długość wczytywanej tablicy", dataTable.length);
    console.log("wczytujemy:", dataTable);

    for (let i = 0; i < dataTable.length; i++) {
        if (dataTable[i].typeOfRow === "rowTextBold") { tableAddTextBoldLine() }
        if (dataTable[i].typeOfRow === "rowText") { tableAddTextLine() }
        if (dataTable[i].typeOfRow === "rowDate") { tableAddDataLine() }
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

        // element 3 - pomiary
        nodeList[3 + addRowElements].value = dataTable[row].info.measurings

        // element 4 - eksploatacyjne wynik
        nodeList[4 + addRowElements].value = dataTable[row].info.wynik1

        // element 5 - eksploatacyjne norma 
        nodeList[5 + addRowElements].value = dataTable[row].info.norma1

        // element 6 - rownomiernosc pomiary
        nodeList[6 + addRowElements].value = dataTable[row].info.wynik2

        // element 7 - rownomiernosc norma
        nodeList[7 + addRowElements].value = dataTable[row].info.norma2

        // element 8 - zgodnosc
        nodeList[8 + addRowElements].value = dataTable[row].info.compatibility
    }
}


tableAddNumbers()
checkboxShowHideChanged()

document.querySelector("#showDescriptions").addEventListener("click", checkboxShowHideChanged)
document.querySelector("#removeTableRow").addEventListener("click", checkboxRemoveTableRowChanged)