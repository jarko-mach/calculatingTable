import { recalcAll, saveReport, readReport, saveDoc, readDoc } from "./app.js"
import { tableAddTextLine, tableAddTextBoldLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine } from "./table-operations.js"

let tableButtonsInfo = [
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "Dodaj wiersz <b>nagłówka</b>",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        functionPerformed: function () { tableAddTextBoldLine() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "Dodaj wiersz opisujący <b>stanowisko</b>",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        functionPerformed: function () { tableAddTextLine() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "Dodaj wiersz <b>pomiarów</b>",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        functionPerformed: function () { tableAddDataLine() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "Dodaj <b>pusty</b> wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        functionPerformed: function () { tableAddEmptyLine() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "Dodaj widoczną <b>linię</b> poziomą",
        descriptionText: "<p>Dodaje cienką linię na końcu / na dole tabeli</p>",
        functionPerformed: function () { tableAddThinLine() },
    },
    {
        id: "buttonRecalc",
        class: "button",
        buttonText: "Przelicz",
        descriptionText: `<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. 
    Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. 
    Do wskazywania części dziesiętnych można używać <b>kropki</b> lub <b>przecinka</b>. 
    Po sprawdzeniu, że dane zostały wpisane poprawnie, następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. 
    Brak wprowadzonych danych /błędnie wprowadzone dane wg normy w polach [5] i [7] spowoduje niemożność obliczenia stanu w kolumnie [8]</p>`,
        functionPerformed: function () { recalcAll() },
    },
    // {
    //     id: "buttonShow",
    //     class: "button",
    //     buttonText: "Odsłoń wszystko",
    //     descriptionText: `<p>Odsłania pola od [3] do [8] w tabeli, które zostały ukryte poleceniem 'Przelicz'.<br> 
    // Powodem ukrycia mogą być: <br>1° brak zmierzonych danych <br>2° błędne wpisanie danych - np. wprowadzono literę zamiast cyfry itp.</p>`,
    //     functionPerformed: function () { showAllHidden() },
    // },
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>",
        functionPerformed: function () { saveReport(); saveDoc() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Odczytuje zapisane dane</p>",
        functionPerformed: function () { readDoc(); readReport() },
    },]

export function checkboxShowHideChanged() {

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

