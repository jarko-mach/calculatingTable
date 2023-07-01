import { recalcAll, showAllHidden } from "./app.js"
import { createTableNewDataLine } from "./tableParamets.js"
import { saveDoc, readDoc } from "./save-read.js"


export function checkboxChanged() {

    let displayButtons
    let tableDescription

    let checkBox = document.querySelector("#showDescriptions");
    const divButtons = document.querySelector("#footerButtons")

    if (checkBox.checked == true) {
        console.log("zaznaczony")
        displayButtons = "footerButtonsWithDescription"
        tableDescription = ["<p>Dodaje nową linię / nowy wiersz na końcu listy / na końcu tabeli</p>",
            "<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. Do wskazywania części dziesiętnych proszę używać <b>kropki</b>. Po poprawnym wczytaniu danych następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. Brak wprowadzonych danych wg normy w polach [5] i [7] spowoduje niemożność obliczenia stanu w kolumnie [8]<br>Dla wiersza, w którym w polu [3] brakuje wyników lub wprowadzone dane są niepoprawne, pola od [3] do [8] zostaną ukryte. Daje to możliwość dopisania jedynie linii tekstu/nagłówka</p>",
            "<p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry itp.</p>",
            "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>",
            "<p>Odczytuje zapisane dane</p>"]
    } else {
        console.log("odznaczony")
        displayButtons = "footerOnlyButtons"
        tableDescription = ["", "", "", "", "", ""]
    }

    divButtons.innerHTML =
        `<div class="${displayButtons}">
            <button id="buttonAdd" class="button">Dodaj nową linię</button>
            ${tableDescription[0]}
            <button id="buttonRecalc" class="button">Przelicz</button>
            ${tableDescription[1]}
            <button id="buttonShow" class="button">Odsłoń wszystko</button>
            ${tableDescription[2]}
            <button id="buttonSave" class="button">Zapisz</button>
            ${tableDescription[3]}
            <button id="buttonRead" class="button">Wczytaj</button>
            ${tableDescription[4]}
        </div>`

    document.querySelector("#buttonAdd").addEventListener("click", createTableNewDataLine)
    document.querySelector("#buttonRecalc").addEventListener("click", recalcAll)
    document.querySelector("#buttonShow").addEventListener("click", showAllHidden)
    document.querySelector("#buttonSave").addEventListener("click", saveDoc)
    document.querySelector("#buttonRead").addEventListener("click", readDoc)
}

