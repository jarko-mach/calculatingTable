"use strict"

// READING DATA OF TABLE

const removeAllNewRows = () => {
    let elementsToRemove = convertClassesIntoOneString(classTableRows)
    const elements = document.querySelectorAll(elementsToRemove)
    // console.log("usuwando", elements)
    elements.forEach((elem) => { elem.remove() })
}

export const readDataForTable_5a = () => {
    const nameOfTable = tempInformations[5].tableName
    // console.log("odczytuję tablicę:", nameOfTable)
    removeAllNewRows()
    let dataTable = JSON.parse(localStorage.getItem(nameOfTable))
    console.log("wczytujemy:", dataTable)
    if (!dataTable) {return}
    // console.log("długość wczytywanej tablicy", dataTable.length)

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
        if (dataTable[row].info.place.length > 35) nodeList[2 + addRowElements].rows = Math.ceil(dataTable[row].info.place.length / 35)
        // console.log("długi tekst", dataTable[row].info.place, dataTable[row].info.place.length)

        // element 3 - pomiary
        nodeList[3 + addRowElements].value = dataTable[row].info.measurings

        // console.log("pomiary odczytuję ", nodeList[3 + addRowElements].rowsNumber)
        if (dataTable[row].info.measurings.length > 25) nodeList[3 + addRowElements].rows = Math.ceil(dataTable[row].info.measurings.length / 25)

        // element 4 - eksploatacyjne wynik

        let localString4 = dataTable[row].info.wynik1
        let foundIndex4 = localString4.indexOf("false")
        // jeżeli do wyniku dopisano false, to ten wynik powinien byc podkreslony, jest błędny i nie spełnia normy PN
        if (foundIndex4 !== -1) {
            nodeList[4 + addRowElements].value = localString4.slice(0, foundIndex4)
            nodeList[4 + addRowElements].classList.add("measuringsToLow")
        } else { nodeList[4 + addRowElements].value = localString4 }

        // element 5 - eksploatacyjne norma 
        nodeList[5 + addRowElements].value = dataTable[row].info.norma1

        // element 6 - rownomiernosc pomiary
        let localString6 = dataTable[row].info.wynik2.replace('.', ',')
        let foundIndex6 = localString6.indexOf("false")
        // jeżeli do wyniku dopisano false, to ten wynik powinien byc podkreslony, jest błędny i nie spełnia normy PN
        if (foundIndex6 !== -1) {
            nodeList[6 + addRowElements].value = localString6.slice(0, foundIndex6)
            nodeList[6 + addRowElements].classList.add("measuringsToLow")
        } else { nodeList[6 + addRowElements].value = localString6 }

        // element 7 - rownomiernosc norma
        nodeList[7 + addRowElements].value = dataTable[row].info.norma2

        // element 8 - zgodnosc
        nodeList[8 + addRowElements].value = dataTable[row].info.compatibility
    }
}

