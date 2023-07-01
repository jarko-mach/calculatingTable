// szerokości kolumn tabeli
// let tableParameters = [7, 50, 45, 18, 12, 15, 12, 12]
// let converter = 3
// let convertedTableParameters = tableParameters.map(element => element * converter);

export const addTableNumbers = () => {
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

export const createTableNewLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("addedLine")

    // <td class="cells" width="4%">a</td>
    // <td class="cells" width="29%">b</td>
    // <td class="cells" width="26%">b</td>
    // <td class="cells" width="11%">b</td>
    // <td class="cells" width="7%">b</td>
    // <td class="cells" width="9%">b</td>
    // <td class="cells" width="7%">b</td>
    // <td class="cells" width="7%">b</td>

    newElement.innerHTML =
        ` <td class="tableGeneral"> <input class="numberLp cellInput" type="number" value="1"></td>
          <td class="tableGeneral"> <textarea class="place cellInput"></textarea> </td>
          <td class="tableGeneral"> <textarea class="measurings cellInput"></textarea> </td>
          <td class="tableGeneral"> <input type="number" class="wynik-1 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-1 cellInput"></td>
          <td class="tableGeneral"> <input type="number" class="wynik-2 cellInput" disabled></td>
          <td class="tableGeneral"> <input type="number" class="norma-2 cellInput" step="0.1"></td>
          <td class="tableGeneral"> <input type="text" class="compatibility cellInput" disabled></td>
    `
    lastElement.append(newElement)
}