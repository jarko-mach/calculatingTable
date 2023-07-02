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

export const createTableNewDataLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("addedLine")

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

export const createTableNewDescriptionLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("addedLine")
    newElement.innerHTML =
        ` <td class="tableLineUp"> <input class="numberLp cellInput" type="number" value="1"></td>
          <td class="tableLineUp"> <textarea class="place cellInput"></textarea> </td>
          <td class="tableLineUp"> <textarea class="measurings cellInput"></textarea> </td>
          <td class="tableLineUp"> <input type="number" class="wynik-1 cellInput" disabled></td>
          <td class="tableLineUp"> <input type="number" class="norma-1 cellInput"></td>
          <td class="tableLineUp"> <input type="number" class="wynik-2 cellInput" disabled></td>
          <td class="tableLineUp"> <input type="number" class="norma-2 cellInput" step="0.1"></td>
          <td class="tableLineUp"> <input type="text" class="compatibility cellInput" disabled></td>
    `
    lastElement.append(newElement)
}

export const createTableThinLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    // newElement.classList.add("addedLine")
    newElement.innerHTML =
        `   <td colspan="8" class="tableLineUp"></td>
            
    `
    lastElement.append(newElement)
    // for (let i = 1; i < 31; i++) {
    //     createTableNewDescriptionLine()
    // }

    lastElement = document.querySelector(".tableContainer")
}