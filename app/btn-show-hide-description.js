import { recalcAll, saveReport, readReport, saveDoc, readDoc, operationIsDone } from "./app.js"
import { tableAddTextLine, tableAddTextBoldLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine } from "./table-operations.js"

let tableButtonsInfo = [
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription0",
        functionPerformed: function () { tableAddTextBoldLine(),checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription1",
        functionPerformed: function () { tableAddTextLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDisplayDescription2",
        functionPerformed: function () { tableAddDataLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "footerDisplayDescription3",
        functionPerformed: function () { tableAddEmptyLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "footerDisplayDescription4",
        functionPerformed: function () { tableAddThinLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonRecalc",
        class: "button",
        buttonText: "Przelicz",
        descriptionText: `<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. 
    Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. 
    Do wskazywania części dziesiętnych można używać <b>kropki</b> lub <b>przecinka</b>. 
    Po sprawdzeniu, że dane zostały wpisane poprawnie, następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. <br>
    Brak wprowadzonych danych lub błędnie wprowadzone dane w kolumnach [5] i [7] spowodują niemożność obliczenia stanu w kolumnie [8]</p>`,
        descriptionClass: "footerDisplayDescription5",
        functionPerformed: function () { recalcAll(), operationIsDone() },
    },
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>",
        descriptionClass: "footerDisplayDescription6",
        functionPerformed: function () { saveReport(); saveDoc(), operationIsDone() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Odczytuje dane zapisane lokalnie na dysku</p>",
        descriptionClass: "footerDisplayDescription7",
        functionPerformed: function () { readDoc(); readReport(); checkboxesDisabledFalse(this), operationIsDone() },
    },
]

let tableCheckBoxInfo = [
    {
        id: "removeTableRow",
        name: "removeTableRow",
        value: false,
        labelId: "labelCB1",
        labelFor: "removeTableRow",
        class: "labelCB",
        checkboxText: "usuwanie",
        descriptionText: "<p>Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to pozwala usuwać wybrane wiersze tabeli badań kliknięciem myszki</p>",
        descriptionClass: "footerDisplayDescription101",
        functionPerformed: function () { },
    },
    {
        id: "addGreyBackground",
        name: "addGreyBackground",
        value: true,
        labelId: "labelCB2",
        labelFor: "addGreyBackground",
        class: "labelCB",
        checkboxText: "wyszarzenie",
        descriptionText: "<p>Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to dodaje szare tło do pól, które można edytować</p>",
        descriptionClass: "footerDisplayDescription102",
        functionPerformed: function () { },
    },
    {
        id: "showDescriptions",
        name: "showDescriptions",
        value: false,
        labelId: "labelCB3",
        labelFor: "showDescriptions",
        class: "labelCB",
        checkboxText: "opis przycisków",
        descriptionText: "<p>Włącza / wyłącza pojawianie się pól z wyjaśnieniami</p>",
        descriptionClass: "footerDisplayDescription103",
        functionPerformed: function () { },
    },
]

export function addMenuCheckboxes() {
    const elementDivWithCheck = document.querySelector(".menuCheckboxes")
    let textDivWithCheck = ""

    tableCheckBoxInfo.forEach((element, index) => {
        textDivWithCheck += `<div class="checkboxDiv">
                                <input type="checkbox" id="${element.id}" name="${element.name}" value="${element.value}">
                                <label id="${element.labelId}" for="${element.labelFor}" class="${element.class}"> ${element.checkboxText}</label>
                             </div>`
        // console.log("tDWC", textDivWithCheck)
    })

    elementDivWithCheck.innerHTML = textDivWithCheck

    const divElement = document.querySelector(".menuCheckboxesDescriptions");
    tableCheckBoxInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription footerDisplayDescription${index + 100}">${localString}</p>`
    })
}

export function addMenuCheckboxesDescriptions() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")
    console.log("allCheckBoxes", allCheckBoxes)
    console.log("allCheckBoxesDescription", allCheckBoxesDescription)

    allCheckBoxes.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            allCheckBoxesDescription[index].classList.add("footerDisplayDescriptionVisible")
        })
        element.addEventListener("mouseout", () => {
            allCheckBoxesDescription[index].classList.remove("footerDisplayDescriptionVisible")
        })
    })
}

export function removeMenuCheckboxesDescriptions() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")
    allCheckBoxes.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            allCheckBoxesDescription[index].classList.remove("footerDisplayDescriptionVisible")
        })
    })
}

export function addMenuButtons() {
    const elementDivWithButtons = document.querySelector(".menuButtons")
    let textDivWithButtons = `<div class="menuButtons">`

    tableButtonsInfo.forEach((element, index) => {
        if (index === 0) { textDivWithButtons += `<p class="textMenu">Dodaj na końcu tabeli wiersz:</p>` }
        if (index === 5) { textDivWithButtons += `<p class="textMenu">Sprawdź poprawność:</p>` }
        if (index === 6) { textDivWithButtons += `<p class="textMenu">Zapamiętaj:</p>` }
        textDivWithButtons += `<button id=${element.id} class=${element.class}> ${element.buttonText}</button>`
    })
    textDivWithButtons += `<p class="textMenu">Włącz/Wyłącz:</p>`
    elementDivWithButtons.innerHTML = textDivWithButtons

    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
    })
}

const showHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    const pElement = document.querySelector(".footerDisplayDescription" + myIndexFound);
    pElement.classList.add("footerDisplayDescriptionVisible")
}

const hideHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    const pElement = document.querySelector(".footerDisplayDescription" + myIndexFound);
    pElement.classList.remove("footerDisplayDescriptionVisible")
}

export const addHelpToMenu = () => {
    const divElement = document.querySelector(".menuDescriptions");
    tableButtonsInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription footerDisplayDescription${index}">${localString}</p>`
    })
}

export const showHideMenuDescriptions = () => {
    let checkBoxState = document.querySelector("#showDescriptions")
    const allButtons = document.querySelectorAll(".menuButtons .button")

    if (checkBoxState.checked) {
        allButtons.forEach((element, index) => {
            element.addEventListener("mouseover", showHelp)
            element.addEventListener("mouseout", hideHelp)
        })
        addMenuCheckboxesDescriptions()
    } else {
        allButtons.forEach((element, index) => {
            element.removeEventListener("mouseover", showHelp)
            element.removeEventListener("mouseout", hideHelp)
        })
        removeMenuCheckboxesDescriptions()
    }
}

export const prepareToPrint = () => {
    document.querySelector("footer").classList.toggle("footerHide")
}

const checkboxesDisabledFalse = (element) => {
    console.log(element)
    document.querySelector("#addGreyBackground").disabled = false
    document.querySelector("#removeTableRow").disabled = false
}
