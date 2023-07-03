import { recalcAll, showAllHidden } from "./app.js"
import { createTableNewDataLine, createTableThinLine, createTableNewDescriptionLine } from "./table-operations.js"
import { saveDoc, readDoc } from "./save-read.js"

let tableButtonsInfo = [
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "Dodaj wiersz nagłówka",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        functionPerformed: function () { createTableNewDescriptionLine() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "Dodaj wiersz opisujący stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        functionPerformed: function () { createTableNewPlaceLine() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "Dodaj wiersz pomiarów",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu stanowiska, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        functionPerformed: function () { createTableNewDataLine() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "Dodaj cienką linię poziomą",
        descriptionText: "<p>Dodaje cienką nową linię na końcu tabeli</p>",
        functionPerformed: function () { createTableThinLine() },
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
    Dla wiersza, w którym w polu [3] brakuje wyników lub wprowadzone dane są niepoprawne, pola od [3] do [8] zostaną ukryte</p>`,
        functionPerformed: function () { recalcAll() },
    },
    {
        id: "buttonShow",
        class: "button",
        buttonText: "Odsłoń wszystko",
        descriptionText: `<p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> 
    Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry itp.</p>`,
        functionPerformed: function () { showAllHidden() },
    },
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>",
        functionPerformed: function () { saveDoc() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Odczytuje zapisane dane</p>",
        functionPerformed: function () { readDoc() },
    },]

export function checkboxChanged() {

    let checkBoxState = document.querySelector("#showDescriptions");
    const elementDivWithButtons = document.querySelector("#footerButtons")
    let buttonsClass = (checkBoxState.checked === true) ? "footerButtonsWithDescription" : "footerOnlyButtons"
    let textDivWithButtons = `<div class="${buttonsClass}">`

    tableButtonsInfo.forEach((element, index) => {
        textDivWithButtons += `<button id=${element.id} class=${element.class}> ${element.buttonText}</button>`
        if (buttonsClass == "footerButtonsWithDescription") {
            textDivWithButtons += `${element.descriptionText}`
        }
    })

    elementDivWithButtons.innerHTML = textDivWithButtons

    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
    })
}
