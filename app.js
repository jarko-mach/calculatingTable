
const createTableNewLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    newElement = document.createElement("tr")
    newElement.classList.add("addedLine")
    newElement.innerHTML =
        ` <td class="numberLp"> <input class="cellWidth-small" type="number" value="1"> </td>
          <td> <textarea rows="4" cols="20" class="place"> </textarea> </td>
          <td> <textarea rows="4" cols="40" class="measurings"> </textarea> </td>
          <td> <input type="number" class="wynik-1 cellWidth-normal" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-1"> </td>
          <td> <input type="number" class="wynik-2 cellWidth-normal" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-2"> </td>
          <td> <input type="text" class="compatibility cellWidth-normal" disabled></td>
    `
    lastElement.append(newElement)
}

const displayBox = (event) => {
    // console.log(event.target)
}

const recalcAll = function (e) {
    let calculatedEksploatacyjne
    let normaEksploatacyjne
    let calculatedRownomiernosc
    let normaRownomiernosc

    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log(nodeList)

    const rowsNumber = document.querySelectorAll(".addedLine").length
    console.log(rowsNumber)

    for (row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 6
        console.log("+", addRowElements)
        // wybieram pięć pierwszych elementów
        // element 0 i obliczam element 1 – oblicz eksploatacyjne
        let measurings = nodeList[0 + addRowElements].value

        const re = /,/;
        measureTable = measurings.split(re);
        measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })

        const computeEksploatacyjne = () => {
            let average = 0
            measureTable.forEach((elem) => { average += elem })
            calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
            return calculatedEksploatacyjne
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

        if (calculatedEksploatacyjne > normaEksploatacyjne && calculatedRownomiernosc > normaRownomiernosc) {
            nodeList[5 + addRowElements].value = "Tak"
        } else nodeList[5 + addRowElements].value = "Nie"
    }
}

const recalc = (e) => {
    let calculatedEksploatacyjne
    let calculatedRownomiernosc
    const normaEksploatacyjne = document.querySelector(".norma-1").value
    const normaRownomiernosc = document.querySelector(".norma-2").value
    let measurings = document.querySelector(".measurings").value

    const re = /,/;
    measureTable = measurings.split(re);
    measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })

    const computeEksploatacyjne = () => {
        let average = 0
        measureTable.forEach((elem) => { average += elem })
        calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
        return calculatedEksploatacyjne
    }

    document.querySelector(".wynik-1").innerText = computeEksploatacyjne()

    calculatedRownomiernosc
        = Number(Math.round(Math.min(...measureTable) / calculatedEksploatacyjne + 'e+2') + 'e-2')

    document.querySelector(".wynik-2").innerText = calculatedRownomiernosc

    if (calculatedEksploatacyjne > normaEksploatacyjne && calculatedRownomiernosc > normaRownomiernosc) {
        document.querySelector(".compatibility").innerText = "Tak"
    } else document.querySelector(".compatibility").innerText = "Nie"
}

document.querySelector(".mainContainer").addEventListener("keydown", displayBox)
document.querySelector("#buttonAdd").addEventListener("click", createTableNewLine)
document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
