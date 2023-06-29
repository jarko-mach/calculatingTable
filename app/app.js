import { checkboxChanged } from "./btn-description.js"
import { saveDoc, readDoc } from "./save-read.js"

export const createTableNewLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("addedLine")
    newElement.innerHTML =
        ` <td> <input class="cellWidth-small numberLp" type="number" value="1"></td>
          <td> <textarea rows="4" cols="20" class="place"></textarea> </td>
          <td> <textarea rows="4" cols="30" class="measurings"></textarea> </td>
          <td> <input type="number" class="wynik-1 cellWidth-small" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-1"></td>
          <td> <input type="number" class="wynik-2 cellWidth-small" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-2" step="0.1"></td>
          <td> <input type="text" class="compatibility cellWidth-small" disabled></td>
    `
    lastElement.append(newElement)
}

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

    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log(nodeList)

    const rowsNumber = document.querySelectorAll(".addedLine").length
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
                nodeList[5 + addRowElements].value = "Tak"
            } else nodeList[5 + addRowElements].value = "Nie"
        }
    }
}



checkboxChanged()

document.querySelector("#showDescriptions").addEventListener("click", checkboxChanged)
document.querySelector("#buttonAdd").addEventListener("click", createTableNewLine)
document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
document.querySelector("#buttonShow").addEventListener("click", showAllHidden)
document.querySelector("#buttonSave").addEventListener("click", saveDoc)
document.querySelector("#buttonRead").addEventListener("click", readDoc)

