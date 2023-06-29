import { recalcAll, showAllHidden, createTableNewLine } from "./app.js"
import { saveDoc, readDoc } from "./save-read.js"

export function checkboxChanged() {
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

const showButtonsDescription = () => {
    const myElement = document.querySelector("#footerButtons")
    myElement.innerHTML =
        `<div class="footer">
    <button id="buttonAdd" class="button">Dodaj nową linię</button>
    <p>Dodaje nową linię / nowy wiersz na końcu listy / na końcu tabeli</p>

    <button id="buttonRecalc" class="button">Przelicz</button>
    <p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. Do wskazywania części dziesiętnych proszę urzywać <b>kropki</b>. Po poprawnym wczytaniu danych następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. 
        Brak wprowadzonych danych wg normy w polach [5] i [7] spowoduje niemożność obliczenia stanu w kolumnie [8]<br>Dla wiersza, w którym w polu [3] brakuje wyników lub wprowadzone
        dane są niepoprawne, pola od [3] do [8] zostaną ukryte. Daje to możliwość dopisania jedynie linii tekstu/nagłówka</p>
        <button id="buttonShow" class="button">Odsłoń wszystko</button>
        <p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry itp.</p>

    <button id="buttonSave" class="button">Zapisz</button>
    <p>Zapisuje zawartość tabelki lokalnie na dysku</p>

    <button id="buttonRead" class="button">Wczytaj</button>
    <p>Odczytuje zapisane dane</p>
</div>`
}

