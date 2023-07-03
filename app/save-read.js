import { tableAddDataLine, tableAddTextLine, tableAddThinLine } from "./table-operations.js"

let dataTableOriginal = [
    {
        typeOfRow: "",
        info: {
            numberLp: 0,
            place: "",
            measurings: "",
            wynik1: 0,
            norma1: 0,
            wynik2: 0,
            norma2: 0,
            compatibility: "",
        }
    }
]
let dataTableJsonS
let dataTableLocal = []

let correctMeasurments = (dataString) => {
    console.log("zaczynam korektę zapisu", dataString, "ilosc znakow:", Boolean(dataString.length))

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
        console.log("a co tu mamy:", myTable)
        myTable.forEach((elem, index) => {
            console.log("index", index, "zawartosc", myTable[index])
            if (Number(myTable[index])) {
                myTable[index] = Number(myTable[index])
            } else alert("Znaleziono błąd w zapisie wyników")
        })
        console.log("a co to wyszło:", myTable)
        return myTable.join("; ")
    } else return ""
}

export const saveDoc = () => {

    const rowsNumber = document.querySelectorAll(".rowThinLine, .rowDate, .rowText ").length

    console.log("liczba wierszy:", rowsNumber)

    while (dataTableLocal.length < rowsNumber) {
        dataTableJsonS = JSON.parse(JSON.stringify(dataTableOriginal))
        dataTableLocal.push(...dataTableJsonS)
    }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility, .rowThinLine, .rowDate, .rowText ")
    // console.log("liczba elementów:", nodeList.length)
    // console.log("rodzaj elementów:", nodeList)

    for (let row = 0; row < rowsNumber; row++) {

        // console.log("Zapisuję rząd:", row)

        let addRowElements = row * 9
        // console.log("Dodaję elementów:", addRowElements)

        // element 1 - rodzaj wiersza
        dataTableLocal[row].typeOfRow = nodeList[0 + addRowElements].className

        //jeżeli jest to cienka linia, to pomijamy resztę wpisów
        if (nodeList[0 + addRowElements].className !== "rowThinLine") {
            // console.log("warunek if", nodeList[0 + addRowElements].className)

            // element 2 - lp
            // console.log("rząd:", row, "element", 0 + addRowElements, "lp", nodeList[0 + addRowElements])
            dataTableLocal[row].info.numberLp = nodeList[1 + addRowElements].value

            // element 3 - miejsce pomiarów
            // console.log("rząd:", row, "element", 1 + addRowElements, "miejsce", nodeList[1 + addRowElements])
            dataTableLocal[row].info.place = nodeList[2 + addRowElements].value

            // element 4 - pomiary
            // jeżeli brak pomiarów to jest to linia tylko z tekstem, więc resztę punktów w tej linii pomijamy
            // if (nodeList[2 + addRowElements].value) {

            // console.log("rząd:", row, "element", 2 + addRowElements, "pomiary", Boolean(nodeList[2 + addRowElements].value))
            dataTableLocal[row].info.measurings = correctMeasurments(nodeList[3 + addRowElements].value)

            // element 5 - eksploatacyjne wynik
            // console.log("rząd:", row, "element", 3 + addRowElements, "wynik", nodeList[3 + addRowElements])
            dataTableLocal[row].info.wynik1 = nodeList[4 + addRowElements].value

            // element 6 - eksploatacyjne norma 
            // console.log("rząd:", row, "element", 4 + addRowElements)
            dataTableLocal[row].info.norma1 = nodeList[5 + addRowElements].value

            // element 7 - rownomiernosc pomiary
            dataTableLocal[row].info.wynik2 = nodeList[6 + addRowElements].value

            // element 8 - rownomiernosc norma
            dataTableLocal[row].info.norma2 = nodeList[7 + addRowElements].value

            // element 9 - zgodnosc
            dataTableLocal[row].info.compatibility = nodeList[8 + addRowElements].value
        }

        // }
    }
    console.log("tabela:", dataTableLocal)
    console.log("JSON", JSON.stringify(dataTableLocal))
    localStorage.setItem("myElement", JSON.stringify(dataTableLocal))
}


export const readDoc = () => {
    let dataTable = JSON.parse(localStorage.getItem("myElement"));
    console.log("długość wczytywanej tablicy", dataTable.length);
    console.log("wczytujemy:", dataTable);

    for (let i = 0; i < dataTable.length; i++) {
        if (dataTable[i].typeOfRow === "rowText") { tableAddTextLine() }
        if (dataTable[i].typeOfRow === "rowDate") { tableAddDataLine() }
        if (dataTable[i].typeOfRow === "rowThinLine") { tableAddThinLine() }
    }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility, .rowThinLine, .rowDate, .rowText ")
    console.log("liczba elementów:", nodeList.length)
    console.log("tabela:", dataTable)
    console.log("elementy:", nodeList)

    for (let row = 0; row < dataTable.length; row++) {

        let addRowElements = row * 9

        console.log("wiersz:", row)
        console.log("node list element", nodeList[1 + addRowElements])

        // element 0 - opis wiersza
        // nodeList[0 + addRowElements].className = dataTableLocal[row].typeOfRow


        // element 1 - lp
        nodeList[1 + addRowElements].value = dataTable[row].info.numberLp

        // element 2 - miejsce pomiarów
        nodeList[2 + addRowElements].value = dataTable[row].info.place

        // element 3 - pomiary
        // console.log("Odczytuję pole pomiarów. Wiersz: ", row, "liczba znaków:", dataTable[row].measurings.length)
        nodeList[3 + addRowElements].value = dataTable[row].info.measurings

        // element 4 - eksploatacyjne wynik
        nodeList[4 + addRowElements].value = dataTable[row].info.wynik1

        // element 5 - eksploatacyjne norma 
        nodeList[5 + addRowElements].value = dataTable[row].info.norma1

        // element 6 - rownomiernosc pomiary
        nodeList[6 + addRowElements].value = dataTable[row].info.wynik2

        // element 7 - rownomiernosc norma
        nodeList[7 + addRowElements].value = dataTable[row].info.norma2

        // element 8 - zgodnosc
        nodeList[8 + addRowElements].value = dataTable[row].info.compatibility
    }
}