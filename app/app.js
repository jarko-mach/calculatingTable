import { checkboxShowHideChanged } from "./btn-show-hide-description.js"
import { tableAddNumbers, removeTableRow, checkboxRemoveTableRowChanged } from "./table-operations.js"

export const showAllHidden = function () {
    console.log("pokazuj")
    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    const rowsNumber = document.querySelectorAll(".addedLine").length
    console.log(rowsNumber)

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

    const rowsNumber = document.querySelectorAll(".rowThinLine, .rowDate, .rowText").length
    console.log("liczba wierszy:", rowsNumber)

    for (let row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 6
        console.log("Jeśli to kolejny rząd, to zwiększam i o:", addRowElements)

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

tableAddNumbers()
checkboxShowHideChanged()

document.querySelector("#showDescriptions").addEventListener("click", checkboxShowHideChanged)
document.querySelector("#removeTableRow").addEventListener("click", checkboxRemoveTableRowChanged)