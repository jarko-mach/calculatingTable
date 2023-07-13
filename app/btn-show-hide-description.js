import { recalcAll, saveReport, readReport, saveDoc, readDoc } from "./app.js"
import { tableAddTextLine, tableAddTextBoldLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine } from "./table-operations.js"

let tableButtonsInfo = [
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription0",
        functionPerformed: function () { tableAddTextBoldLine(); operationIsDone() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription1",
        functionPerformed: function () { tableAddTextLine(); operationIsDone() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDisplayDescription2",
        functionPerformed: function () { tableAddDataLine(); operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDisplayDescription3",
        functionPerformed: function () { tableAddEmptyLine(); operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "linię",
        descriptionText: "<p>Dodaje cienką linię na końcu / na dole tabeli</p>",
        descriptionClass: "footerDisplayDescription4",
        functionPerformed: function () { tableAddThinLine(); operationIsDone() },
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
        descriptionClass: "footerDisplayDescription5",
        functionPerformed: function () { recalcAll(); operationIsDone() },
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
        descriptionClass: "footerDisplayDescription6",
        functionPerformed: function () { saveReport(); saveDoc(); operationIsDone() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Odczytuje zapisane dane</p>",
        descriptionClass: "footerDisplayDescription7",
        functionPerformed: function () { readDoc(); readReport(); operationIsDone(this) },
    },]

export function checkboxShowHideChanged() {

    let checkBoxState = document.querySelector("#showDescriptions");
    const elementDivWithButtons = document.querySelector(".buttonsShowAll")

    let textDivWithButtons = `<div class="buttonsShowAll">`

    tableButtonsInfo.forEach((element, index) => {
        if (index === 0) { textDivWithButtons += `<p class="textMenu">Dodaj do tabeli:</p>` }
        if (index === 5) { textDivWithButtons += `<p class="textMenu">Sprawdź poprawność:</p>` }
        if (index === 6) { textDivWithButtons += `<p class="textMenu">Zapamiętaj:</p>` }
        textDivWithButtons += `<button id=${element.id} class=${element.class}> ${element.buttonText}</button>`
    })

    elementDivWithButtons.innerHTML = textDivWithButtons

    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
    })

    // displayButtonsDescription()
}

const displayButtonsDescription = () => {
    const localElement = document.querySelector(".buttonDescription");

    tableButtonsInfo.forEach((element, index) => {
        const localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        localElement.innerHTML += `<p class="allDescription footerDisplayDescription${index}">${localString}</p>`
    })


    const showHelp = (elem => {
        console.log("najazd, srcElement", elem.srcElement.id)
        const index = tableButtonsInfo.findIndex((element, index) => {
            console.log(element.descriptionClass)
            element.descriptionClass === elem.srcElement.id
        })
        console.log(index)
    })

    // const hideHelp = (elem => {

    //     console.log("odjazd", elem.srcElement)
    // })

    let allDesc = document.querySelectorAll("button")
    console.log("allDesc", allDesc)
    allDesc.forEach((element, index) => {
        element.addEventListener("mouseover", showHelp)
        // element.addEventListener("mouseout", hideHelp)
    })



}

export const prepareToPrint = () => {
    document.querySelector("footer").classList.toggle("footerHide")
}

const operationIsDone = (element) => {
    console.log(element)
}
