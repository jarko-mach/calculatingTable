import { classTableRows } from "./app.js"

export const tableAddNumbers = () => {
    const lastElement = document.querySelector(".showNumbers")
    lastElement.innerHTML =
        ` <tr>
        <td class="tableGeneral tableNumber cell007mm">1</td>
        <td class="tableGeneral tableNumber cell050mm">2</td>
        <td class="tableGeneral tableNumber cell045mm">3</td>
        <td class="tableGeneral tableNumber cell016mm">4</td>
        <td class="tableGeneral tableNumber cell012mm">5</td>
        <td class="tableGeneral tableNumber cell016mm">6</td>
        <td class="tableGeneral tableNumber cell012mm">7</td>
        <td class="tableGeneral tableNumber cell012mm">8</td>
        </tr>
    `
}

export const tableAddTextBoldLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("rowTextBold")
    newElement.innerHTML =
        ` <td class="tableGeneral"> <input class="numberLp cellInput " type="number"></td>
          <td class="tableGeneral"> <textarea class="place cellInput tableDescriptionArea tableTextBold" rows="1"></textarea></td>
          <td class="tableGeneral"> <input type="text" class="measurings cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="wynik-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="norma-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="wynik-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="norma-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="compatibility cellInput" disabled></td>
    `
    lastElement.append(newElement)
}

export const tableAddTextLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("rowText")
    newElement.innerHTML =
        ` <td class="tableGeneral"> <input class="numberLp cellInput" type="number" value=""></td>
          <td class="tableGeneral"> <textarea class="place cellInput tableDescriptionArea" rows="1"></textarea></td>
          <td class="tableGeneral"> <input type="text" class="measurings cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="wynik-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="norma-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="wynik-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="norma-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="text" class="compatibility cellInput" disabled></td>
    `
    lastElement.append(newElement)
}

export const tableAddDataLine = () => {

    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("rowDate")
    newElement.innerHTML =
        ` <td class="tableGeneral"> <input class="numberLp cellInput" type="number" hidden></td>
          <td class="tableGeneral"> <textarea class="place cellInput" rows="1"></textarea> </td>
          <td class="tableGeneral"> <textarea class="measurings cellInput" rows="1"></textarea> </td>
          <td class="tableGeneral"> <input type="number" class="wynik-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-1 cellInput"></td>
          <td class="tableGeneral"> <input type="number" class="wynik-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-2 cellInput" step="0.01"></td>
          <td class="tableGeneral"> <input type="text" class="compatibility cellInput" disabled></td>
    `
    lastElement.append(newElement)
}


export const tableAddThinLine = () => {

    let lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("rowThinLine")
    newElement.innerHTML =
        ` <td class="tdThinLine"> <input type="text" class="numberLp inputThinLine"> </td>
      <td class="tdThinLine"> <input type="text" class="place inputThinLine"> </td>
      <td class="tdThinLine"> <input type="text" class="measurings inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-1 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-1 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-2 inputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-2 inputThinLine" disabled></td>
      <td class="tdThinLine"> <input type="text" class="compatibility inputThinLine" disabled></td>
`
    lastElement.append(newElement)
}

export const removeTableRow = (e) => {
    let element = e.target.closest("tr")

    if (element.classList == "rowTextBold isRedOutline" || element.classList == "rowText isRedOutline" || element.classList == "rowDate isRedOutline" || element.classList == "rowThinLine isRedOutline") {
        element.remove()
    }
}

const colorTableRow = (e) => {
    let element = e.target.closest("tr")
    let myValue = element?.classList?.value
    if (myValue && myValue !== "showNumbers" && myValue !== "nocolor") {
        element.classList.add("isRedOutline")
    }
}

const discolorTableRow = (e) => {
    let element = e.target.closest("tr")
    element?.classList?.remove("isRedOutline")
}

export const checkboxRemoveTableRowChanged = () => {
    let checkBoxState = document.querySelector("#removeTableRow");

    if (checkBoxState.checked == true) {
        document.querySelector(".tableContainer").addEventListener("click", removeTableRow)
        document.querySelector(".tableContainer").addEventListener("mouseover", colorTableRow)
        document.querySelector(".tableContainer").addEventListener("mouseout", discolorTableRow)
    } else {
        document.querySelector(".tableContainer").removeEventListener("click", removeTableRow)
        document.querySelector(".tableContainer").removeEventListener("mouseover", colorTableRow)
        document.querySelector(".tableContainer").removeEventListener("mouseout", discolorTableRow)
    }

}