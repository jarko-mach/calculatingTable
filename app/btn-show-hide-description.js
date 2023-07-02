import { recalcAll, showAllHidden } from "./app.js"
import { createTableNewDataLine, createTableThinLine } from "./table-operations.js"
import { saveDoc, readDoc } from "./save-read.js"

let tableButtonsInfo = [{
    id: "buttonAdd",
    class: "button",
    buttonText: "Dodaj nową linię",
    descriptionText: "<p>Dodaje nową linię / nowy wiersz na końcu listy / na końcu tabeli</p>"
},
{
    id: "buttonRecalc",
    class: "button",
    buttonText: "Przelicz",
    descriptionText: `<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. 
                    Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. 
                    Do wskazywania części dziesiętnych proszę używać <b>kropki</b>. 
                    Po poprawnym wczytaniu danych następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. 
                    Brak wprowadzonych danych wg normy w polach [5] i [7] spowoduje niemożność obliczenia stanu w kolumnie [8]<br>
                    Dla wiersza, w którym w polu [3] brakuje wyników lub wprowadzone dane są niepoprawne, pola od [3] do [8] zostaną ukryte. 
                    Daje to możliwość dopisania jedynie linii tekstu/nagłówka</p>`
},
{
    id: "buttonShow",
    class: "button",
    buttonText: "Odsłoń wszystko",
    descriptionText: `<p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> 
                    Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry itp.</p>`
},
{
    id: "buttonSave",
    class: "button",
    buttonText: "Zapisz",
    descriptionText: "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>"
},
{
    id: "buttonRead",
    class: "button",
    buttonText: "Wczytaj",
    descriptionText: "<p>Odczytuje zapisane dane</p>"
},]


export function checkboxChanged() {

    let checkBox = document.querySelector("#showDescriptions");
    const addDivWithButtons = document.querySelector("#footerButtons")
    
    let displayButtonsClass = (checkBox.checked === true) ? "footerButtonsWithDescription" : "footerOnlyButtons"

    let textButtons = `<div class="${displayButtonsClass}">`

    tableButtonsInfo.forEach((element, index) => {
        textButtons += `<button id=${element.id} class=${element.class}> ${element.buttonText}</button>`
        if (displayButtonsClass == "footerButtonsWithDescription") {
            textButtons += `${element.descriptionText}`
        }
    })

    addDivWithButtons.innerHTML = textButtons

    // document.querySelector("#buttonAdd").addEventListener("click", createTableNewDataLine)
    document.querySelector("#buttonAdd").addEventListener("click", createTableThinLine)

    document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
    document.querySelector("#buttonShow").addEventListener("click", showAllHidden)
    document.querySelector("#buttonSave").addEventListener("click", saveDoc)
    document.querySelector("#buttonRead").addEventListener("click", readDoc)
}

