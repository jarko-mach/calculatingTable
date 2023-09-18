"use strict";


import {
    tempInformations,
    convertClassesIntoOneString,
    classTableRows,
    classTableColumns
} from "../../../miscellaneous/misc.js"

// RECALCULATING

export const tableRecalcAll = function (e) {
    let eksploatacionCalculated
    let eksploatacionNorm
    let uniformityCalculated  //Rownomiernosc
    let uniformityNorm
    let textColumn1 = ""
    let foundText_ObszarZadania_OneLineBefore = false
    let measurments_OneLineBefore_IsOk = true
    let foundText_ObszarZadania_CurrentLine = false

    // console.log("zaczynam przeliczać...")

    // wczytuję classy dla kolumn
    let readedClasses = convertClassesIntoOneString(classTableColumns)
    const nodeList = document.querySelectorAll(readedClasses)
    // console.log("trafione punkty do obliczeń:", nodeList.length)
    if (!nodeList.length) {
        alert("Wygląda na to, że nie ma żadnych danych w tabeli");
        return
    } else {
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

            // brak danych liczbowych
            // kolumna nr 8 - Tak/Nie
            // nodeList[7 + addRowElements].value = "????"

            if (!computeEksploatacyjne()) {
                // console.log("WYPAD: brak danych")
                foundText_ObszarZadania_OneLineBefore = false
                measurments_OneLineBefore_IsOk = true
                continue
            }

            // kolumna nr 4  -----------------------------------------------------------------
            nodeList[3 + addRowElements].value = computeEksploatacyjne()

            // kolumna nr 5 - norma / sprawdzić czy jest wpisane cokolwiek a jeśli tak, to czy nie są to bzdurki ----------------
            eksploatacionNorm = Number(nodeList[4 + addRowElements].value)

            // console.log("eksploatacionNorm", eksploatacionNorm)

            foundError = re3.test(eksploatacionNorm)
            // console.log("foundError", foundError)

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
            // debugger
            textColumn1 = nodeList[1 + addRowElements].value
            foundText_ObszarZadania_CurrentLine = (textColumn1.search("obszar zadania") !== -1) ? true : false

            if (measurmentsEksploatacionOk && measurmentsUniformityOk) {
                if ((foundText_ObszarZadania_CurrentLine)) {
                    nodeList[7 + addRowElements].value = " "  // t
                } else {
                    if (measurments_OneLineBefore_IsOk === true) {
                        nodeList[7 + addRowElements].value = "TAK"
                    } else {
                        if (foundText_ObszarZadania_OneLineBefore === false) {

                            nodeList[7 + addRowElements].value = "TAK"
                        } else {
                            nodeList[7 + addRowElements].value = "NIE /"
                        }
                    }
                }
                measurments_OneLineBefore_IsOk = true
            } else {
                if ((foundText_ObszarZadania_CurrentLine)) {
                    nodeList[7 + addRowElements].value = " "   // n
                    foundText_ObszarZadania_OneLineBefore = false
                } else {
                    foundText_ObszarZadania_OneLineBefore = true
                    nodeList[7 + addRowElements].value = "NIE";
                }
                measurments_OneLineBefore_IsOk = false
            }
            foundText_ObszarZadania_OneLineBefore = foundText_ObszarZadania_CurrentLine
        }
    }

}