
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
        ` <td class="tableGeneral"><input class="numberLp cellInput" type="number" value="1"></td>
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
        ` <td class="tableGeneral"> <input class="numberLp cellInput" type="number" value="1"></td>
          <td class="tableGeneral"> <textarea class="place cellInput" rows="1"></textarea> </td>
          <td class="tableGeneral"> <textarea class="measurings cellInput" rows="1"></textarea> </td>
          <td class="tableGeneral"> <input type="number" class="wynik-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-1 cellInput"></td>
          <td class="tableGeneral"> <input type="number" class="wynik-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-2 cellInput" step="0.1"></td>
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
    ` <td class="tdThinLine"> <input type="text" class="numberLp cellInputThinLine"> </td>
      <td class="tdThinLine"> <input type="text" class="place cellInputThinLine"> </td>
      <td class="tdThinLine"> <input type="text" class="measurings cellInputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-1 cellInputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-1 cellInputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="wynik-2 cellInputThinLine" disabled> </td>
      <td class="tdThinLine"> <input type="text" class="norma-2 cellInputThinLine" disabled></td>
      <td class="tdThinLine"> <input type="text" class="compatibility cellInputThinLine" disabled></td>
`

    lastElement.append(newElement)
}