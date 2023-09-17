"use strict"

import { saveReportAndTable } from "../../../main-app/save-report-and-table.js"
import {
    classTableColumns,
    classTableRows,
    classTableAll,
    convertClassesIntoOneString,
    tempInformations,
    currentTablNam,
    dataTableLocal,
    dataTableOriginal, dataForm1
} from "../../../miscellaneous/misc.js"

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
    document.querySelector(`.${tempInformations[5].tableName} .menuButtonsInLine`).scrollIntoView()
    let lastElement = ""
    // debugger
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
        lastElement = document.querySelector(`.${tempInformations[5].tableName} tbody`)
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

const insertData1 = (elem) => {
    // console.log(!elem.srcElement)
    if (!elem.srcElement.value) { elem.srcElement.value = "500" }
    elem.srcElement.select()
}

const insertData2 = (elem) => {
    // console.log(!elem.srcElement)
    if (!elem.srcElement.value) { elem.srcElement.value = "0,60" }
    elem.srcElement.select()
}

export const tableAddDataLine = (method, element) => {
    let newElement = document.createElement("tr")
    newElement.classList.add("rowDate")
    newElement.innerHTML =
        ` <td > <input type="text" class="numberLp" ></td>
          <td > <textarea class="place" rows="1"></textarea> </td>
          <td > <textarea class="measurings" rows="1"></textarea> </td>
          <td > <input type="text" class="wynik-1" disabled></td>
          <td > <input type="text" class="norma-1"></td>
          <td > <input type="text" class="wynik-2" disabled></td>
          <td > <input type="text" class="norma-2" step="0.01"></td>
          <td > <input type="text" class="compatibility " disabled></td>
    `
    addElementNow(method, element, newElement)
    const nodeList_Norma1 = document.querySelectorAll(".rowDate .norma-1")
    nodeList_Norma1[nodeList_Norma1.length - 1].addEventListener("focus", insertData1)

    const nodeList_Norma2 = document.querySelectorAll(".rowDate .norma-2")
    nodeList_Norma2[nodeList_Norma2.length - 1].addEventListener("focus", insertData2)
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
    // console.log("element remove", element)
    if (element.classList == "rowTextBold isRedOutline" ||
        element.classList == "rowText isRedOutline" ||
        element.classList == "rowDate isRedOutline" ||
        element.classList == "rowEmpty isRedOutline" ||
        element.classList == "rowThinLine isRedOutline") {
        element.remove()
        let checkBoxState = document.querySelector(`.${currentTablNam[0]} #removeTableRow`)
        checkBoxState.checked = false
        checkbox_RemoveTableRow_Changed()
        saveReportAndTable()
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
                <div class="btnLayout_Add">
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
    // console.log("mamy click dla ", element)
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
    // console.log("checkbox", checkBoxRemoveState)
    if (checkBoxADDState.checked == true) {
        document.querySelector(".labelCB2").classList.add("greenLabel")
        document.querySelector(".labelCB2").textContent = "wstawiasz"
        document.querySelector(".tableLight tbody").addEventListener("click", addTableRow)
        document.querySelector(".tableLight tbody").addEventListener("mouseover", colorGreenTableRow)
        document.querySelector(".tableLight tbody").addEventListener("mouseout", discolorGreenTableRow)
    } else {
        document.querySelector(".labelCB2").classList.remove("greenLabel")
        document.querySelector(".labelCB2").textContent = "wstawianie"
        document.querySelector(".tableLight tbody").removeEventListener("click", addTableRow)
        document.querySelector(".tableLight tbody").removeEventListener("mouseover", colorGreenTableRow)
        document.querySelector(".tableLight tbody").removeEventListener("mouseout", discolorGreenTableRow)
    }

}

// FILE SAVE // ----------------------------------------------------------

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

export const saveTable = (nameOfTable) => {

    // function localStorageTest() {
    //     const test = "test" + new Date().valueOf();
    //     try {
    //         localStorage.setItem(test, test);
    //         localStorage.removeItem(test);
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // }

    // if (!localStorageTest()) {
    //     alert("Błąd zapisu na dysku twardym. Program nie będzie działał poprawnie")

    // }

    // odczytuję liczbę wierszy zapisanej tabeli
    let readedClassesFromTable = convertClassesIntoOneString(classTableRows)
    const rowsNumber = document.querySelectorAll(readedClassesFromTable).length
    // console.log("liczba wierszy zapisu", rowsNumber)

    // zwiększam tabelę z danymi o liczbę wierszy
    // console.log("warunek while", dataTableLocal.length, rowsNumber)
    while (dataTableLocal.length < rowsNumber) {
        let dataTableJsonS = JSON.parse(JSON.stringify(dataTableOriginal))
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
            let wynik1Class = ""
            if (nodeList[4 + addRowElements].className == "wynik-1 measuringsToLow") { wynik1Class = false }

            dataTableLocal[row].info.wynik1 = nodeList[4 + addRowElements].value + wynik1Class

            // element 6 - eksploatacyjne norma 
            dataTableLocal[row].info.norma1 = nodeList[5 + addRowElements].value

            // element 7 - rownomiernosc pomiary            
            let wynik2Class = ""
            if (nodeList[6 + addRowElements].className == "wynik-2 measuringsToLow") { wynik2Class = false }

            dataTableLocal[row].info.wynik2 = nodeList[6 + addRowElements].value + wynik2Class

            // element 8 - rownomiernosc norma
            dataTableLocal[row].info.norma2 = nodeList[7 + addRowElements].value

            // element 9 - zgodnosc
            dataTableLocal[row].info.compatibility = nodeList[8 + addRowElements].value
        }
    }
    // console.log("tabela:", dataTableLocal)
    // console.log("JSON", JSON.stringify(dataTableLocal))
    localStorage.setItem(`${nameOfTable}`, JSON.stringify(dataTableLocal))
}

