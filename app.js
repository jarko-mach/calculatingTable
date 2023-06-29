
let dataTable = [
    {
        numberLp: 1,
        place: "",
        measurings: "",
        wynik1: 1,
        norma1: 1,
        wynik2: 1,
        norma2: 1,
        compatibility: "si",
    }
]

const createTableNewLine = () => {
    const lastElement = document.querySelector(".tableContainer").lastChild
    newElement = document.createElement("tr")
    newElement.classList.add("addedLine")
    newElement.innerHTML =
        ` <td> <input class="cellWidth-small numberLp" type="number" value="1"> </td>
          <td> <textarea rows="4" cols="20" class="place"> </textarea> </td>
          <td> <textarea rows="4" cols="30" class="measurings"> </textarea> </td>
          <td> <input type="number" class="wynik-1 cellWidth-small" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-1"> </td>
          <td> <input type="number" class="wynik-2 cellWidth-small" disabled></td>
          <td> <input type="number" class="cellWidth-normal norma-2" step="0.1"> </td>
          <td> <input type="text" class="compatibility cellWidth-small" disabled></td>
    `
    lastElement.append(newElement)
}

const showButtonsDescription = () => {
    const myElement = document.querySelector("#footerButtons")
    myElement.innerHTML =
        `<div class="footer">
    <button id="buttonAdd" class="button">Dodaj nową linię</button>
    <p>Dodaje nową linię / nowy wiersz na końcu listy / na końcu tabeli</p>

    <button id="buttonRecalc" class="button">Przelicz</button>
    <p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3], a następnie oblicza i wpisuje
        wyniki w kolumnach [4] i [6]. 
        Brak wprowadzonych danych wg normy w polach [5] i [7] spowoduje niemożność obliczenia stanu w kolumnie [8]<br>Dla wiersza, w którym w polu [3] brakuje wyników lub wprowadzone
        dane są niepoprawne, pola od [3] do [8] zostaną ukryte. Daje to możliwość dopisania jedynie linii tekstu/nagłówka</p>
        <button id="buttonShow" class="button">Odsłoń wszystko</button>
        <p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry lub inny znak niż przecinek, np. kropkę lub średnik itp.</p>

    <button id="buttonSave" class="button">Zapisz</button>
    <p>Zapisuje zawartość tabelki lokalnie na dysku</p>

    <button id="buttonRead" class="button">Wczytaj</button>
    <p>Odczytuje zapisane dane</p>
</div>`
}

const hideButtonsDescription = () => {
    const myElement = document.querySelector("#footerButtons")
    myElement.innerHTML =
        `<div>
    <button id="buttonAdd" class="button">Dodaj nową linię</button>
    <button id="buttonRecalc" class="button">Przelicz</button>
    <button id="buttonShow" class="button">Odsłoń wszystko</button>
    <button id="buttonSave" class="button">Zapisz</button>
    <button id="buttonRead" class="button">Wczytaj</button>
</div>`
}


const displayBox = (event) => {
    // console.log(event.target)
}

const showAllHidden = function () {
    console.log("pokazuj")
    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    const rowsNumber = document.querySelectorAll(".addedLine").length
    console.log(rowsNumber)

    for (row = 0; row < rowsNumber; row++) {
        let addRowElements = row * 6
        for (i = 0; i < 6; i++) {
            nodeList[i + addRowElements].style.visibility = "visible"
        }
    }
}

const recalcAll = function (e) {
    let calculatedEksploatacyjne
    let normaEksploatacyjne
    let calculatedRownomiernosc
    let normaRownomiernosc

    let nodeList = document.querySelectorAll(".measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log(nodeList)

    const rowsNumber = document.querySelectorAll(".addedLine").length
    console.log("liczba wierszy:", rowsNumber)

    for (row = 0; row < rowsNumber; row++) {

        let addRowElements = row * 6
        console.log("Jeśli to kolejny rząd, to zwiększam i o:", addRowElements)

        // wybieram pięć pierwszych elementów
        // element 0 i obliczam element 1 – oblicz eksploatacyjne
        let measurings = nodeList[0 + addRowElements].value

        const re = /,/;
        measureTable = measurings.split(re);
        measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })

        const computeEksploatacyjne = () => {
            let average = 0
            measureTable.forEach((elem) => { average += elem })
            calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
            return calculatedEksploatacyjne
        }

        // brak danych liczbowych
        if (!computeEksploatacyjne()) {

            for (i = 0; i < 6; i++) {
                nodeList[i + addRowElements].style.visibility = "hidden"
            }
            // console.log("brak danych, zwiększono i o liczbę:", addRowElements)
            continue
        }

        nodeList[1 + addRowElements].value = computeEksploatacyjne()

        // element 2 - norma
        normaEksploatacyjne = nodeList[2 + addRowElements].value

        // element 3 - oblicz równomierność
        calculatedRownomiernosc
            = Number(Math.round(Math.min(...measureTable) / calculatedEksploatacyjne + 'e+2') + 'e-2')

        nodeList[3 + addRowElements].value = calculatedRownomiernosc

        // element 4 – norma równomierność
        normaRownomiernosc = nodeList[4 + addRowElements].value

        // element 5 - Tak/Nie
        nodeList[5 + addRowElements].value = "????"

        if (normaEksploatacyjne && normaRownomiernosc) {

            if (calculatedEksploatacyjne > normaEksploatacyjne && calculatedRownomiernosc > normaRownomiernosc) {
                nodeList[5 + addRowElements].value = "Tak"
            } else nodeList[5 + addRowElements].value = "Nie"
        }
    }
}

const saveDoc = () => {

    const rowsNumber = document.querySelectorAll(".addedLine").length
    // console.log("liczba wierszy:", rowsNumber)

    while (dataTable.length < rowsNumber) {
        dataTable.push({
            numberLp: 1,
            place: "",
            measurings: "",
            wynik1: 1,
            norma1: 1,
            wynik2: 1,
            norma2: 1,
            compatibility: "???",
        })
    }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log("liczba elementów:", nodeList.length)

    for (row = 0; row < rowsNumber; row++) {

        // console.log("Zapisuję rząd:", row)

        let addRowElements = row * 8
        // console.log("Dodaję elementów:", addRowElements)

        // element 1 - lp
        // console.log("rząd:", row, "element", 0 + addRowElements, "lp", nodeList[0 + addRowElements])
        dataTable[row].numberLp = nodeList[0 + addRowElements].value

        // element 2 - miejsce pomiarów
        // console.log("rząd:", row, "element", 1 + addRowElements, "miejsce", nodeList[1 + addRowElements])
        dataTable[row].place = nodeList[1 + addRowElements].value

        // element 3 - pomiary
        // console.log("rząd:", row, "element", 2 + addRowElements, "pomiary", nodeList[2 + addRowElements])
        dataTable[row].measurings = nodeList[2 + addRowElements].value

        // element 4 - eksploatacyjne wynik
        // console.log("rząd:", row, "element", 3 + addRowElements, "wynik", nodeList[3 + addRowElements])
        dataTable[row].wynik1 = nodeList[3 + addRowElements].value

        // element 5 - eksploatacyjne norma 
        // console.log("rząd:", row, "element", 4 + addRowElements)
        dataTable[row].norma1 = nodeList[4 + addRowElements].value

        // element 6 - rownomiernosc pomiary
        dataTable[row].wynik2 = nodeList[5 + addRowElements].value

        // element 7 - rownomiernosc norma
        dataTable[row].norma2 = nodeList[6 + addRowElements].value

        // element 8 - zgodnosc
        dataTable[row].compatibility = nodeList[7 + addRowElements].value
    }
    console.log("JSON", JSON.stringify(dataTable))
    localStorage.setItem("myElement", JSON.stringify(dataTable))
}

const readDoc = () => {
    dataTable = JSON.parse(localStorage.getItem("myElement"));
    console.log(dataTable.length);
    while (document.querySelectorAll(".addedLine").length < dataTable.length) { createTableNewLine() }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log("liczba elementów:", nodeList.length)

    for (row = 0; row < dataTable.length; row++) {

        let addRowElements = row * 8

        // element 1 - lp
        nodeList[0 + addRowElements].value = dataTable[row].numberLp

        // element 2 - miejsce pomiarów
        nodeList[1 + addRowElements].value = dataTable[row].place

        // element 3 - pomiary
        nodeList[2 + addRowElements].value = dataTable[row].measurings

        // element 4 - eksploatacyjne wynik
        nodeList[3 + addRowElements].value = dataTable[row].wynik1

        // element 5 - eksploatacyjne norma 
        nodeList[4 + addRowElements].value = dataTable[row].norma1

        // element 6 - rownomiernosc pomiary
        nodeList[5 + addRowElements].value = dataTable[row].wynik2

        // element 7 - rownomiernosc norma
        nodeList[6 + addRowElements].value = dataTable[row].norma2

        // element 8 - zgodnosc
        nodeList[7 + addRowElements].value = dataTable[row].compatibility
    }
}

const recalc = (e) => {
    let calculatedEksploatacyjne
    let calculatedRownomiernosc
    const normaEksploatacyjne = document.querySelector(".norma-1").value
    const normaRownomiernosc = document.querySelector(".norma-2").value
    let measurings = document.querySelector(".measurings").value

    const re = /,/;
    measureTable = measurings.split(re);
    measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })

    const computeEksploatacyjne = () => {
        let average = 0
        measureTable.forEach((elem) => { average += elem })
        calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
        return calculatedEksploatacyjne
    }

    document.querySelector(".wynik-1").innerText = computeEksploatacyjne()

    calculatedRownomiernosc
        = Number(Math.round(Math.min(...measureTable) / calculatedEksploatacyjne + 'e+2') + 'e-2')

    document.querySelector(".wynik-2").innerText = calculatedRownomiernosc

    if (calculatedEksploatacyjne > normaEksploatacyjne && calculatedRownomiernosc > normaRownomiernosc) {
        document.querySelector(".compatibility").innerText = "Tak"
    } else document.querySelector(".compatibility").innerText = "Nie"
}

function checkboxChanged() {
    let checkBox = document.querySelector("#showDescriptions");

    if (checkBox.checked == true) {
        showButtonsDescription()
    } else {
        hideButtonsDescription()
    }
    document.querySelector("#buttonAdd").addEventListener("click", createTableNewLine)
    document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
    document.querySelector("#buttonShow").addEventListener("click", showAllHidden)
    document.querySelector("#buttonSave").addEventListener("click", saveDoc)
    document.querySelector("#buttonRead").addEventListener("click", readDoc)
}

// showButtonsDescription()
hideButtonsDescription()

document.querySelector("#showDescriptions").addEventListener("click", checkboxChanged)
document.querySelector("#buttonAdd").addEventListener("click", createTableNewLine)
document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
document.querySelector("#buttonShow").addEventListener("click", showAllHidden)
document.querySelector("#buttonSave").addEventListener("click", saveDoc)
document.querySelector("#buttonRead").addEventListener("click", readDoc)

