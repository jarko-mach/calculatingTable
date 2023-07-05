
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

export const tableAddTextLine = (withBold) => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    // newElement.classList.add("addedRow")
    newElement.classList.add("rowText")
    newElement.innerHTML =
        ` <td class="tableGeneral"><input class="numberLp cellInput" type="number" value=""></td>
          <td class="tableGeneral"><textarea class="place cellInput tableDescriptionArea ${withBold}" rows="1"></textarea></td>
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
    // newElement.classList.add("addedRow")
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
    // newElement.innerHTML = `<td colspan="8" class="tableHorizontalLine"></td>`

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
    // console.log("e.target", e.target)
    // console.log("closest tr", e.target.closest("tr"))

    let element = e.target.closest("tr")
    // console.log("element", element)

    if (element.classList == "rowText" || element.classList == "rowDate" || element.classList == "rowThinLine") {
        // element.remove()
        console.log("usuwam...........")
    }
}

export const checkboxRemoveTableRowChanged = () => {
    let checkBoxState = document.querySelector("#removeTableRow");
    console.log("checkboxRemoveTableRowChanged", checkBoxState.checked)

    if (checkBoxState.checked == true) {
        document.querySelector(".tableContainer").addEventListener("click", removeTableRow)
        console.log("checkbox true", checkBoxState.checked)
    } else {
        console.log("checkbox false", checkBoxState.checked)
        document.querySelector(".tableContainer").removeEventListener("click", removeTableRow)
    }

}