"use strict"

import {
    convertClassesIntoOneString,
    classTableColumns,
    classTableRows
} from "../miscellaneous/misc.js"

import { currentTablNam } from "../miscellaneous/misc.js"

// import { checkToUnblockSaveButton } from "./menu-btn-dscr-check.js"

export const addFirstThreeColumnsHeader = () => {
    const myElement = document.querySelector(".threeColumns")
    // console.log(myElement)
    myElement.innerHTML =
        ` 
        <span>TECHNO-SERVICE S.A. <br> Pracownia Ochrony Środowiska</span>
        <p> Sprawozdanie numer TSO /<input type="text" class="numberTSO"> / <input type="text" class="yearTSO"></p>
        <p>Strona / Stron <input type="text" class="pageTSO"> / <input type="text" class="pagesTSO"></p>
    `
    // myElement.addEventListener("click", checkToUnblockSacheckToUnblockSaveButtonveButton)
}

export const tableAddNumbers = (tableName) => {
    const lastElement = document.querySelectorAll(`#${tableName} .showNumbers`)
    lastElement[lastElement.length - 1].innerHTML =
        ` <tr>
        <td class="widthColumn1">1</td>
        <td class="widthColumn2">2</td>
        <td class="widthColumn3">3</td>
        <td class="widthColumn4">4</td>
        <td class="widthColumn5">5</td>
        <td class="widthColumn6">6</td>
        <td class="widthColumn7">7</td>
        <td class="widthColumn8">8</td>
        </tr>
        `
}

const addElementNow = (method, element, newElement) => {
    // document.querySelector(`.${currentTablNam[0]} .table .menuButtonsInLine`).scrollIntoView()
    let lastElement = ""
    if (method === "before") {
        // console.log("methoda before: > ", element)
        lastElement = element
        lastElement.before(newElement)
        return
    }
    if (method === "after") {
        // console.log("methoda after: > ", element)
        lastElement = element
        lastElement.after(newElement)
        return
    }
    if (!method) {
        // console.log("methoda empty > ", element)
        lastElement = document.querySelector(`.${currentTablNam[0]} tbody`)
        lastElement.append(newElement)
        return
    }
}


export const tableAddTextBoldLine = (method, element) => {
    let newElement = document.createElement("tr")

    newElement.classList.add("rowTextBold")
    newElement.innerHTML =
        ` <td > <input type="text" class="numberLp  tableTextBold"></td>
          <td > <textarea class="place tableTextBold" rows="1"></textarea></td>
          <td > <input type="text" class="measurings" disabled></td>
          <td > <input type="text" class="wynik-1" disabled></td>
          <td > <input type="text" class="norma-1" disabled></td>
          <td > <input type="text" class="wynik-2" disabled></td>
          <td > <input type="text" class="norma-2" disabled></td>
          <td > <input type="text" class="compatibility" disabled></td>
    `
    addElementNow(method, element, newElement)
}

export const tableAddTextLine = (method, element) => {
    let newElement = document.createElement("tr")
    newElement.classList.add("rowText")
    newElement.innerHTML =
        ` <td > <input type="text" class="numberLp "></td>
          <td > <textarea class="place" rows="1"></textarea></td>
          <td > <input type="text" class="measurings" disabled></td>
          <td > <input type="text" class="wynik-1" disabled></td>
          <td > <input type="text" class="norma-1" disabled></td>
          <td > <input type="text" class="wynik-2" disabled></td>
          <td > <input type="text" class="norma-2" disabled></td>
          <td > <input type="text" class="compatibility" disabled></td>
    `
    addElementNow(method, element, newElement)
}

export const tableAddDataLine = (method, element) => {
    let newElement = document.createElement("tr")
    newElement.classList.add("rowDate")
    newElement.innerHTML =
        ` <td > <input type="text" class="numberLp" hidden></td>
          <td > <textarea class="place" rows="1"></textarea> </td>
          <td > <textarea class="measurings" rows="1"></textarea> </td>
          <td > <input type="text" class="wynik-1" disabled></td>
          <td > <input type="text" class="norma-1"></td>
          <td > <input type="text" class="wynik-2" disabled></td>
          <td > <input type="text" class="norma-2" step="0.01"></td>
          <td > <input type="text" class="compatibility " disabled></td>
    `
    addElementNow(method, element, newElement)
}

export const tableAddEmptyLine = (method, element) => {
    let newElement = document.createElement("tr")
    newElement.classList.add("rowEmpty")
    newElement.innerHTML =
        ` <td > <input type="text" class="numberLp" hidden></td>
          <td > <input type="text" class="place" disabled></td>
          <td > <input type="text" class="measurings" disabled></td>
          <td > <input type="text" class="wynik-1" disabled></td>
          <td > <input type="text" class="norma-1" disabled></td>
          <td > <input type="text" class="wynik-2" disabled></td>
          <td > <input type="text" class="norma-2" disabled></td>
          <td > <input type="text" class="compatibility" disabled></td>
    `

    addElementNow(method, element, newElement)
}

export const tableAddThinLine = (method, element) => {
    let newElement = document.createElement("tr")
    newElement.classList.add("rowThinLine")
    newElement.innerHTML =
        ` <td class="tdThinLine"> <input type="text" class="numberLp inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="place inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="measurings inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-1 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-1 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-2 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-2 inputThinLine" disabled></td>
      <td class="tdThinLine"> <input type="text" class="compatibility inputThinLine" disabled></td>
`
    addElementNow(method, element, newElement)
}

// REMOVE TABLE ROW

export const removeTableRow = (e) => {
    let element = e.target.closest("tr")
    console.log("element remove", element)
    if (element.classList == "rowTextBold isRedOutline" ||
        element.classList == "rowText isRedOutline" ||
        element.classList == "rowDate isRedOutline" ||
        element.classList == "rowEmpty isRedOutline" ||
        element.classList == "rowThinLine isRedOutline") {
        element.remove()
        let checkBoxState = document.querySelector(`.${currentTablNam[0]} #removeTableRow`)
        checkBoxState.checked = false
        checkbox_RemoveTableRow_Changed()
    }
}

const colorTableRow = (e) => {
    let element = e.target.closest("tr")
    let myValue = element.classList
    // console.log("myValue", myValue)
    if (myValue && myValue !== "showNumbers" && myValue !== "nocolor") {
        element.classList.add("isRedOutline")
    }
}

const discolorTableRow = (e) => {
    let element = e.target.closest("tr")
    element.classList.remove("isRedOutline")
}

const convertRowClassesIntoOneStringWithTableName = (myTableName) => {
    let readClasses = ""
    classTableRows.forEach((value, index) => {
        readClasses = (index <= classTableRows.length - 2) ? readClasses += `.${myTableName} .${value}, ` : readClasses += `.${myTableName} .${value}`
    })
    return readClasses
}

export const checkbox_RemoveTableRow_Changed = () => {
    let readedClasses = convertRowClassesIntoOneStringWithTableName(currentTablNam[0])
    const nodeList = document.querySelectorAll(readedClasses)
    // console.log("1",readedClasses)
    // console.log("2 trafione punkty do obliczeń:", nodeList.length)

    let checkBoxState = document.querySelector(`.${currentTablNam[0]} #removeTableRow`);

    if (!nodeList.length) {
        alert("Wygląda na to, że nie ma żadnych danych w tabeli");
        checkBoxState.checked = false
    }

    let checkBoxADDState = document.querySelector(`.${currentTablNam[0]} #addTableRow`);

    if (checkBoxADDState.checked === true) { checkBoxADDState.checked = false }
    // console.log("check", checkBoxState.checked, currentTablNam[0])

    if (checkBoxState.checked == true) {
        document.querySelector(`.${currentTablNam[0]} .labelCB1`).classList.add("redLabel")
        document.querySelector(`.${currentTablNam[0]} .labelCB1`).textContent = "usuwasz!"

        document.querySelectorAll(`.${currentTablNam[0]} .tdThinLine`).forEach((element, index) => {
            element.classList.add("tdThinLineLarger")
        })
        document.querySelector(`.${currentTablNam[0]} tbody`).addEventListener("click", removeTableRow)
        document.querySelector(`.${currentTablNam[0]} tbody`).addEventListener("mouseover", colorTableRow)
        document.querySelector(`.${currentTablNam[0]} tbody`).addEventListener("mouseout", discolorTableRow)
    } else {
        document.querySelector(`.${currentTablNam[0]} .labelCB1`).classList.remove("redLabel")
        document.querySelector(`.${currentTablNam[0]} .labelCB1`).textContent = "usuwanie"

        document.querySelectorAll(`.${currentTablNam[0]} .tdThinLine`).forEach((element, index) => {
            element.classList.remove("tdThinLineLarger")
        })
        document.querySelector(`.${currentTablNam[0]} tbody`).removeEventListener("click", removeTableRow)
        document.querySelector(`.${currentTablNam[0]} tbody`).removeEventListener("mouseover", colorTableRow)
        document.querySelector(`.${currentTablNam[0]} tbody`).removeEventListener("mouseout", discolorTableRow)
    }
}


// ADD TABLE ROW

const colorGreenTableRow = (e) => {
    let element = e.target.closest("tr")
    let myValue = element.classList
    // console.log("myValue", myValue)
    if (myValue && myValue !== "showNumbers" && myValue !== "nocolor") {
        element.classList.add("isGreenOutline")
    }
}

const discolorGreenTableRow = (e) => {
    let element = e.target.closest("tr")
    // console.log("element before remove: >", element, element.classList)
    element.classList.remove("isGreenOutline")
}

const displayDialogboxAddNewRow = (elementCoursorPosition) => {

    const getOKButton = () => {
        const radioGroupUpOrDown = document.querySelectorAll("input[name=insertUpOrDown]")
        const radioGroupinsertLine = document.querySelectorAll("input[name=insertLine]")
        // console.log(radioGroupUpOrDown, radioGroupinsertLine)
        let whereToAddLine = ""

        for (const radio1 of radioGroupUpOrDown) {
            if (radio1.checked) {
                whereToAddLine = radio1.value;
                // console.log(radio1.value)
                break;
            }
        }
        for (const radio2 of radioGroupinsertLine) {
            if (radio2.checked) {
                // console.log(radio2.value)

                switch (radio2.value) {
                    case 'tableAddTextBoldLine':
                        tableAddTextBoldLine(whereToAddLine, elementCoursorPosition)
                        break;

                    case 'tableAddTextLine':
                        tableAddTextLine(whereToAddLine, elementCoursorPosition)
                        break;

                    case 'tableAddDataLine':
                        tableAddDataLine(whereToAddLine, elementCoursorPosition)
                        break;

                    case 'tableAddEmptyLine':
                        tableAddEmptyLine(whereToAddLine, elementCoursorPosition)
                        break;

                    case 'tableAddThinLine':
                        tableAddThinLine(whereToAddLine, elementCoursorPosition)
                        break;

                    default:
                        console.log(`Sorry, we are out of ....`);
                }
            }
        }
        getCancelButton();
    }

    const getCancelButton = () => {
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
        let checkBoxState = document.querySelector("#addTableRow");
        checkBoxState.checked = false;
        checkbox_ADDTableRow_Changed();
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent_Add")

    newElement.innerHTML =
        ` 
        <div class="dialogBox_Add">
            <div class="dialogBoxHeader_Add"> Wstawianie nowej linii tabeli
            </div>
            <div class="dialogBoxChild_Add">
                <fieldset class="selectNarrow">
                    <legend>Wybierz, gdzie wstawić nową linię:</legend>
                    <div class="input_Add">
                        <input type="radio" id="insertAbove" name="insertUpOrDown" value="before" checked>
                        <label for="insertAbove">nad wierszem z kursorem</label>
                    </div>
                    <div class="input_Add">
                        <input type="radio" id="insertBelow" name="insertUpOrDown" value="after">
                        <label for="insertBelow">pod wierszem z kursorem</label>
                    </div>
                </fieldset>
                <fieldset class="selectNarrow">
                    <legend>Wybierz rodzaj wiersza, który chcesz wstawić:</legend>
                    <div class="input_Add">
                        <input type="radio" id="insertHeader" name="insertLine" value="tableAddTextBoldLine" checked>
                        <label for="insertHeader">nagłówek</label>
                    </div>
                    <div class="input_Add">
                        <input type="radio" id="insertPlace" name="insertLine" value="tableAddTextLine">
                        <label for="insertPlace">stanowisko</label>
                    </div>
                    <div class="input_Add">
                        <input type="radio" id="insertMeasure" name="insertLine" value="tableAddDataLine">
                        <label for="insertMeasure">pomiary</label>
                    </div>
                    <div class="input_Add">
                        <input type="radio" id="insertSpace" name="insertLine" value="tableAddEmptyLine">
                        <label for="insertSpace">pusty wiersz</label>
                    </div>
                    <div class="input_Add">
                        <input type="radio" id="insertThinLine" name="insertLine" value="tableAddThinLine">
                        <label for="insertThinLine">linię</label>
                    </div>
                </fieldset>
                <div class="btnLayout">
                    <button class="okSave">Wybierz</button>
                    <button class="noCancel">Anuluj</button>
                </div>
            </div>
        </div>
    
      `
    foundElement.append(newElement)

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
}

export const addTableRow = (e) => {
    let element = e.target.closest("tr")
    discolorGreenTableRow(e)
    let checkBoxState = document.querySelector("#addTableRow")
    checkBoxState.checked = false
    displayDialogboxAddNewRow(element)
    // tableAddEmptyLine("after", element)
    // checkboxADDTableRowChanged()
}

export const checkbox_ADDTableRow_Changed = () => {
    let checkBoxRemoveState = document.querySelector("#removeTableRow");
    let checkBoxADDState = document.querySelector("#addTableRow");

    if (checkBoxRemoveState.checked === true) { checkBoxADDState.checked = false }
    // console.log("checkbox", checkBoxState)
    if (checkBoxADDState.checked == true) {
        document.querySelector(".labelCB2").classList.add("greenLabel")
        document.querySelector(".labelCB2").textContent = "wstawiasz"
        document.querySelector("tbody").addEventListener("click", addTableRow)
        document.querySelector("tbody").addEventListener("mouseover", colorGreenTableRow)
        document.querySelector("tbody").addEventListener("mouseout", discolorGreenTableRow)
    } else {
        document.querySelector(".labelCB2").classList.remove("greenLabel")
        document.querySelector(".labelCB2").textContent = "wstawianie"
        document.querySelector("tbody").removeEventListener("click", addTableRow)
        document.querySelector("tbody").removeEventListener("mouseover", colorGreenTableRow)
        document.querySelector("tbody").removeEventListener("mouseout", discolorGreenTableRow)
    }

}

// FILE SAVE

export const fileSave = () => {
    const lastName = readTemporaryTableReportName()
    let localName
    if (lastName.startsWith(`"`)) {
      localName = lastName.substring(1, lastName.length - 1)
      // console.log("zapisuję...", localName)
    }
    saveTable(localName)
    saveReport(localName)
    alert(`Sprawozdanie ${localName} zostało zapisane`);
  }
  

// RECALCULATING

export const tableRecalcAll = function (e) {
    let eksploatacionCalculated
    let eksploatacionNorm
    let uniformityCalculated  //Rownomiernosc
    let uniformityNorm

    // console.log("zaczynam przeliczać...")

    // wczytuję classy dla kolumn
    let readedClasses = convertClassesIntoOneString(classTableColumns)
    const nodeList = document.querySelectorAll(readedClasses)
    console.log("trafione punkty do obliczeń:", nodeList.length)
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

            if (measurmentsEksploatacionOk && measurmentsUniformityOk) {
                nodeList[7 + addRowElements].value = "TAK"
            } else {
                nodeList[7 + addRowElements].value = "NIE"
            }
        }
    }

}