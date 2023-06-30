// szerokości kolumn tabeli
let tableParameters = [7, 50, 45, 18, 12, 15, 12, 12]
let converter = 3
let convertedTableParameters = tableParameters.map(element => element * converter);

export const addTableNumbers = () => {
    const lastElement = document.querySelector(".showNumbers")
    lastElement.innerHTML =
        ` <tr>
        <td class="tableNumber" width="${convertedTableParameters[0]}mm">1</td>
        <td class="tableNumber" width="${convertedTableParameters[1]}mm">2</td>
        <td class="tableNumber" width="${convertedTableParameters[2]}mm">3</td>
        <td class="tableNumber" width="${convertedTableParameters[3]}mm">4</td>
        <td class="tableNumber" width="${convertedTableParameters[4]}mm">5</td>
        <td class="tableNumber" width="${convertedTableParameters[5]}mm">6</td>
        <td class="tableNumber" width="${convertedTableParameters[6]}mm">7</td>
        <td class="tableNumber" width="${convertedTableParameters[7]}mm">8</td>
        </tr>
    `
}

export const createTableNewLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    let newElement = document.createElement("tr")
    newElement.classList.add("addedLine")

    // let szeroko1 = document.querySelector(".showNumbers").firstElementChild
    // szeroko1 = document.querySelector(".showNumbers")
    // console.log("szerokości:", szeroko1)

    newElement.innerHTML =
        ` <td> <input class="numberLp cell1" type="number" value="1"></td>
          <td> <textarea class="place cell2" width="10mm"></textarea> </td>
          <td> <textarea class="measurings cell3"></textarea> </td>
          <td> <input type="number" class="wynik-1 cell4" disabled></td>
          <td> <input type="number" class="norma-1 cell5"></td>
          <td> <input type="number" class="wynik-2 cell6" disabled></td>
          <td> <input type="number" class="norma-2 cell7" step="0.1"></td>
          <td> <input type="text" class="compatibility cell8" disabled></td>
    `
    lastElement.append(newElement)
}


// stara wersja
// ` <td> <input class="cellWidth-small numberLp" type="number" value="1"></td>
// <td> <textarea rows="4" cols="20" class="place"></textarea> </td>
// <td> <textarea rows="4" cols="30" class="measurings"></textarea> </td>
// <td> <input type="number" class="wynik-1 cellWidth-small" disabled></td>
// <td> <input type="number" class="cellWidth-small norma-1"></td>
// <td> <input type="number" class="wynik-2 cellWidth-small" disabled></td>
// <td> <input type="number" class="cellWidth-small norma-2" step="0.1"></td>
// <td> <input type="text" class="compatibility cellWidth-small" disabled></td>
// `