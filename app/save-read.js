import { createTableNewLine } from "./tableParamets.js"

let dataTable = [
    {
        numberLp: 0,
        place: "",
        measurings: "",
        wynik1: 0,
        norma1: 0,
        wynik2: 0,
        norma2: 0,
        compatibility: "",
    }
]

export const saveDoc = () => {

    const correctMeasurments = (dataString) => {

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

    const rowsNumber = document.querySelectorAll(".addedLine").length
    // console.log("liczba wierszy:", rowsNumber)

    while (dataTable.length < rowsNumber) {
        dataTable.push({
            numberLp: 0,
            place: "",
            measurings: "",
            wynik1: 0,
            norma1: 0,
            wynik2: 0,
            norma2: 0,
            compatibility: "",
        })
    }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log("liczba elementów:", nodeList.length)

    for (let row = 0; row < rowsNumber; row++) {

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
        // jeżeli brak pomiarów to jest to linia tylko z tekstem, więc resztę punktów w tej linii pomijamy
        // if (nodeList[2 + addRowElements].value) {

        // console.log("rząd:", row, "element", 2 + addRowElements, "pomiary", Boolean(nodeList[2 + addRowElements].value))
        dataTable[row].measurings = correctMeasurments(nodeList[2 + addRowElements].value)

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
        // }
    }
    console.log("tabela:", dataTable)
    console.log("JSON", JSON.stringify(dataTable))
    localStorage.setItem("myElement", JSON.stringify(dataTable))
}


export const readDoc = () => {
    let dataTable = JSON.parse(localStorage.getItem("myElement"));
    console.log("długość wczytywanej tablicy", dataTable.length);
    while (document.querySelectorAll(".addedLine").length < dataTable.length) { createTableNewLine() }

    let nodeList = document.querySelectorAll(".numberLp, .place, .measurings, .wynik-1, .norma-1, .wynik-2, .norma-2, .compatibility")
    // console.log("liczba elementów:", nodeList.length)

    for (let row = 0; row < dataTable.length; row++) {

        let addRowElements = row * 8

        // element 1 - lp
        nodeList[0 + addRowElements].value = dataTable[row].numberLp

        // element 2 - miejsce pomiarów
        nodeList[1 + addRowElements].value = dataTable[row].place

        // element 3 - pomiary
        // console.log("Odczytuję pole pomiarów. Wiersz: ", row, "liczba znaków:", dataTable[row].measurings.length)
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