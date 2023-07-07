import { checkboxShowHideChanged } from "./btn-show-hide-description.js"
import { tableAddNumbers, tableAddTextBoldLine, tableAddTextLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine, checkboxRemoveTableRowChanged } from "./table-operations.js"

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
        }
    }
]
let dataTableJsonS
let dataTableLocal = []

// classy dla różnych wierszy tabeli
export let classTableRows = ["rowTextBold", "rowText", "rowThinLine", "rowDate", "rowEmpty"]

// classy dla różnych kolumn tabeli
let classTableColumns = ["numberLp", "place", "measurings", "wynik-1", "norma-1", "wynik-2", "norma-2", "compatibility"]

let classTableAll = [...classTableRows, ...classTableColumns]

const convertClassesIntoOneString = (myTable) => {
    let readClasses = ""
    myTable.forEach((value, index) => {
        readClasses = (index <= myTable.length - 2) ? readClasses += `.${value}, ` : readClasses += `.${value}`
    })
    return readClasses
}

// to chyba nie działa

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

    const re1 = /(\d\s+\d)|[a-z]|(,\s+)$|[,]$/i   //* szukam błędów we wpisach pomiarów
    const re2 = /[,;]/gi        //* przecinek lub średnik stanowi powód do splitowania dla kolumny measurings
    const re3 = /[a-z]/i      // szukam liter w kolumnach [5] i [7]
    let foundError = false

    for (let row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 8
        // console.log("Jeśli to kolejny rząd, to zwiększam i o:", addRowElements)

        //  kolumna nr 3 – odczytuję pomiary
        let measurementsRow = nodeList[2 + addRowElements].value
        // console.log("wiersz", row, "pomiary w stringu:", measurementsRow)

        foundError = re1.test(measurementsRow)
        // console.log("czy znaleziono zabroniony znak?", foundError)

        if (foundError) {
            // console.log("bum")
            nodeList[2 + addRowElements].classList.add("measuringsError")
            nodeList[3 + addRowElements].value = ""
            nodeList[5 + addRowElements].value = ""
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
        if (!computeEksploatacyjne()) {
            // console.log("WYPAD: brak danych")
            continue
        }

        // kolumna nr 4
        nodeList[3 + addRowElements].value = computeEksploatacyjne()

        // kolumna nr 5 - norma / sprawdzić czy jest wpisane cokolwiek a jeśli tak, to czy nie są to bzdurki
        eksploatacionNorm = Number(nodeList[4 + addRowElements].value)
        foundError = re3.test(eksploatacionNorm)
        if (foundError) {
            nodeList[4 + addRowElements].classList.add("measuringsError")
            // console.log("WYPAD: dziwne dane")
            continue
        } else {
            nodeList[4 + addRowElements].classList.remove("measuringsError")
        }
        // console.log("wpisane", eksploatacionNorm, "number", Number(eksploatacionNorm))

        // kolumna nr 6 - oblicz równomierność
        uniformityCalculated
            = Number(Math.round(Math.min(...measurementsRowTable) / eksploatacionCalculated + 'e+2') + 'e-2')

        nodeList[5 + addRowElements].value = String(uniformityCalculated).replace('.', ',')

        // kolumna nr 7 – norma równomierność / sprawdzić czy jest wpisane cokolwiek a jeśli tak, to czy nie są to bzdurki
        uniformityNorm = Number(String(nodeList[6 + addRowElements].value).replace(',', '.'))
        // console.log("uniformityNorm", uniformityNorm)
        foundError = re3.test(uniformityNorm)
        if (foundError) {
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

        // if (eksploatacionNorm && uniformityNorm) {

        //     if (eksploatacionCalculated >= eksploatacionNorm && uniformityCalculated >= uniformityNorm) {
        //         nodeList[7 + addRowElements].value = "TAK"
        //     } else {
        //         nodeList[7 + addRowElements].value = "NIE"

        //         if (eksploatacionCalculated < eksploatacionNorm) {
        //             nodeList[3 + addRowElements].classList.add("measuringsToLow")
        //         } else {
        //             console.log(nodeList[3 + addRowElements])
        //             nodeList[3 + addRowElements].classList.remove("measuringsToLow")
        //         }

        //         if (uniformityCalculated < uniformityNorm) {

        //             nodeList[5 + addRowElements].classList.add("measuringsToLow")
        //         } else {
        //             nodeList[5 + addRowElements].classList.remove("measuringsToLow")
        //         }
        //     }
        // }
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

export const saveDoc = () => {

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
    // console.log("tabela:", dataTableLocal)
    // console.log("JSON", JSON.stringify(dataTableLocal))
    localStorage.setItem("myElement", JSON.stringify(dataTableLocal))
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
    let dataTable = JSON.parse(localStorage.getItem("myElement"));
    // console.log("długość wczytywanej tablicy", dataTable.length);
    // console.log("wczytujemy:", dataTable);

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

        // element 3 - pomiary
        nodeList[3 + addRowElements].value = dataTable[row].info.measurings

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
}

// SHOWING GREY BACKGROUND 

const checkboxGreyBackgroundChanged = () => {
    let checkBoxState = document.querySelector("#addGreyBackground");
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


tableAddNumbers()
checkboxShowHideChanged()
checkboxGreyBackgroundChanged()

document.querySelector("#removeTableRow").addEventListener("click", checkboxRemoveTableRowChanged)
document.querySelector("#addGreyBackground").addEventListener("click", checkboxGreyBackgroundChanged)
document.querySelector("#showDescriptions").addEventListener("click", checkboxShowHideChanged)