"use strict"

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

export const tableAddNumbers = () => {
    const lastElement = document.querySelectorAll(".showNumbers")
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
        lastElement = document.querySelector("tbody")
        lastElement.append(newElement)
        return
    }
}

export const tableAddTextBoldLine = (method, element) => {
    let newElement = document.createElement("tr")
    // console.log(lastElement, newElement)
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
    // console.log("element remove", element)
    if (element.classList == "rowTextBold isRedOutline" ||
        element.classList == "rowText isRedOutline" ||
        element.classList == "rowDate isRedOutline" ||
        element.classList == "rowEmpty isRedOutline" ||
        element.classList == "rowThinLine isRedOutline") {
        element.remove()
        let checkBoxState = document.querySelector("#removeTableRow")
        checkBoxState.checked = false
        checkboxRemoveTableRowChanged()
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

export const checkboxRemoveTableRowChanged = () => {
    let checkBoxState = document.querySelector("#removeTableRow");
    let checkBoxADDState = document.querySelector("#addTableRow");
    
    if (checkBoxADDState.checked === true) {checkBoxState.checked = false }
    
    // console.log("checkbox", checkBoxState.checked, checkBoxADDState.checked)
    if (checkBoxState.checked == true) {
        document.querySelector("#labelCB1").classList.add("redLabel")
        document.querySelector("#labelCB1").textContent = "usuwasz!"

        document.querySelectorAll(".tdThinLine").forEach((element, index) => {
            element.classList.add("tdThinLineLarger")
        })
        document.querySelector("tbody").addEventListener("click", removeTableRow)
        document.querySelector("tbody").addEventListener("mouseover", colorTableRow)
        document.querySelector("tbody").addEventListener("mouseout", discolorTableRow)
    } else {
        document.querySelector("#labelCB1").classList.remove("redLabel")
        document.querySelector("#labelCB1").textContent = "usuwanie"

        document.querySelectorAll(".tdThinLine").forEach((element, index) => {
            element.classList.remove("tdThinLineLarger")
        })
        document.querySelector("tbody").removeEventListener("click", removeTableRow)
        document.querySelector("tbody").removeEventListener("mouseover", colorTableRow)
        document.querySelector("tbody").removeEventListener("mouseout", discolorTableRow)
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
        checkboxADDTableRowChanged();
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

export const checkboxADDTableRowChanged = () => {
    let checkBoxRemoveState = document.querySelector("#removeTableRow");
    let checkBoxADDState = document.querySelector("#addTableRow");
    
    if (checkBoxRemoveState.checked === true) {checkBoxADDState.checked = false }
    // console.log("checkbox", checkBoxState)
    if (checkBoxADDState.checked == true) {
        document.querySelector("#labelCB2").classList.add("greenLabel")
        document.querySelector("#labelCB2").textContent = "wstawiasz"
        document.querySelector("tbody").addEventListener("click", addTableRow)
        document.querySelector("tbody").addEventListener("mouseover", colorGreenTableRow)
        document.querySelector("tbody").addEventListener("mouseout", discolorGreenTableRow)
    } else {
        document.querySelector("#labelCB2").classList.remove("greenLabel")
        document.querySelector("#labelCB2").textContent = "wstawianie"
        document.querySelector("tbody").removeEventListener("click", addTableRow)
        document.querySelector("tbody").removeEventListener("mouseover", colorGreenTableRow)
        document.querySelector("tbody").removeEventListener("mouseout", discolorGreenTableRow)
    }

}
