
let actualTableName = ""
let actualTableChanged = false

export const addFirstThreeColumnsHeader = () => {
    const myElement = document.querySelector(".threeColumns")
    // console.log(myElement)
    myElement.innerHTML =
        ` 
        <span>TECHNO-SERVICE S.A. <br> Pracownia Ochrony Środowiska</span>
        <p> Sprawozdanie TSO /<input type="text" class="numberTSO"> / <input type="text" class="yearTSO"></p>
        <p>Strona / Stron <input type="text" class="pageTSO"> / <input type="text" class="pagesTSO"></p>
    `
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

export const tableAddTextBoldLine = () => {
    const lastElement = document.querySelector("tbody")
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
    lastElement.append(newElement)
}

export const tableAddTextLine = () => {
    const lastElement = document.querySelector("tbody")
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
    lastElement.append(newElement)
}

export const tableAddDataLine = () => {

    const lastElement = document.querySelector("tbody")
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
    lastElement.append(newElement)
}

export const tableAddEmptyLine = () => {

    const lastElement = document.querySelector("tbody")
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
    lastElement.append(newElement)
}


export const tableAddThinLine = () => {

    let lastElement = document.querySelector("tbody")
    console.log("lastElement", lastElement.lastElementChild)
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
    lastElement.append(newElement)
}

export const removeTableRow = (e) => {

    let element = e.target.closest("tr")
    // console.log("element", element)
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
    console.log("checkbox", checkBoxState)
    if (checkBoxState.checked == true) {
        document.querySelector(".labelCB").classList.add("redLabel")
        document.querySelector(".labelCB").textContent = "usuwasz!"

        document.querySelectorAll(".tdThinLine").forEach((element, index) => {
            element.classList.add("tdThinLineLarger")
        })
        document.querySelector("tbody").addEventListener("click", removeTableRow)
        document.querySelector("tbody").addEventListener("mouseover", colorTableRow)
        document.querySelector("tbody").addEventListener("mouseout", discolorTableRow)
    } else {
        document.querySelector(".labelCB").classList.remove("redLabel")
        document.querySelector(".labelCB").textContent = "usuwanie"

        document.querySelectorAll(".tdThinLine").forEach((element, index) => {
            element.classList.remove("tdThinLineLarger")
        })
        document.querySelector("tbody").removeEventListener("click", removeTableRow)
        document.querySelector("tbody").removeEventListener("mouseover", colorTableRow)
        document.querySelector("tbody").removeEventListener("mouseout", discolorTableRow)
    }

}