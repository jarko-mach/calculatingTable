"use strict";

import {
    tableAddTextBoldLine,
    tableAddTextLine,
    tableAddDataLine,
    tableAddEmptyLine,
    tableAddThinLine
} from "./table-operations.js";

import {
    convertClassesIntoOneString,
    classTableColumns,
    operationIsDone
} from "../miscellaneous/misc.js"

// START DEFINITION OF BUTTONS IN TABLE MENU

export let tableMenu_ButtonsInfo = [
    {
        id: "buttonRecalc",
        class: "button",
        buttonText: "Przelicz",
        descriptionText: `<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. 
    Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. 
    Do wskazywania części dziesiętnych można używać <b>kropki</b> lub <b>przecinka</b>. 
    Po sprawdzeniu, że dane zostały wpisane poprawnie, następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. <br>
    Brak wprowadzonych danych lub błędnie wprowadzone dane w kolumnach [5] i [7] spowodują niemożność obliczenia stanu w kolumnie [8]</p>`,
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { recalcAll(), operationIsDone() },
    },
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { tableAddTextBoldLine(), tableMenu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { tableAddTextLine(); tableMenu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { tableAddDataLine(); tableMenu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { tableAddEmptyLine(); tableMenu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { tableAddThinLine(); tableMenu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
]

// START DEFINITION OF CHECKBOXES IN TABLE MENU

let tableMenu_CheckBoxInfo = [
    {
        id: "removeTableRow",
        name: "removeTableRow",
        checked: "",
        disabled: "",
        labelId: "labelCB1",
        labelFor: "removeTableRow",
        class: "labelCB",
        checkboxText: "usuwanie",
        descriptionText: "<p>Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to pozwala usuwać wybrane wiersze tabeli badań kliknięciem myszki</p>",
        descriptionClass: "footerDescription101",
        functionPerformed: function () { },
    },
    {
        id: "addTableRow",
        name: "addTableRow",
        checked: "",
        disabled: "",
        labelId: "labelCB2",
        labelFor: "addTableRow",
        class: "labelCB",
        checkboxText: "wstawianie",
        descriptionText: "<p>Po kliknięciu myszką w istniejącą wiersz tabeli otwiera się okno dialogowe, które pozwala wybrać gdzie i jaki wiersz zostanie dodany do tabeli.</p>",
        descriptionClass: "footerDescription101",
        functionPerformed: function () { },
    },
    {
        id: "addGreyBackground",
        name: "addGreyBackground",
        checked: "",
        disabled: "",
        labelId: "labelCB3",
        labelFor: "addGreyBackground",
        class: "labelCB",
        checkboxText: "wyszarzenie",
        descriptionText: "<p>Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to dodaje szare tło tylko do tych pól, które można edytować</p>",
        descriptionClass: "footerDescription102",
        functionPerformed: function () { },
    },
    {
        id: "showDescriptions",
        name: "showDescriptions",
        checked: "checked",
        disabled: "",
        labelId: "labelCB4",
        labelFor: "showDescriptions",
        class: "labelCB",
        checkboxText: "opis przycisków",
        descriptionText: "<p>Włącza / wyłącza pojawianie się pól z wyjaśnieniami</p>",
        descriptionClass: "footerDescription103",
        functionPerformed: function () { },
    },
]

// BUTTONS IN TABLE MENU 

function tableMenu_addButtons() {
    const elementDivWithButtons = document.querySelector(".point5 .menuButtons")
    const elementDivWithButtonsInLine = document.querySelector(".point5 .menuButtonsInLine")
    let textDivWithButtons = ``
    let textDivWithButtonsInLine = ``
    // debugger

    for (let i = 0; i < tableMenu_ButtonsInfo.length; i++) {
        let tempString = `<button id=${tableMenu_ButtonsInfo[i].id} class=${tableMenu_ButtonsInfo[i].class} ${tableMenu_ButtonsInfo[i].disabled}> ${tableMenu_ButtonsInfo[i].buttonText}</button>`
        // left menu
        if (i < 1) {
            if (i === 0) { textDivWithButtons += `<p class="textMenu">Sprawdź zgodność z PN:</p>` }
            textDivWithButtons += tempString
            // console.log(i, tableButtonsInfo[i].id)
        }
        // under table
        if (i >= 1) {
            if (i === 1) { textDivWithButtonsInLine += `<p class="textMenu">Dodaj na końcu tabeli:</p>` }
            textDivWithButtonsInLine += tempString
        }
    }

    textDivWithButtons += `<p class="textMenu">Włącz/Wyłącz:</p>`
    elementDivWithButtons.innerHTML = textDivWithButtons
    elementDivWithButtonsInLine.innerHTML = textDivWithButtonsInLine
}

const tableMenu_addButtonsDescriptions = () => {
    const divElement = document.querySelector(".point5 .menuDescriptions");
    tableMenu_ButtonsInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription ">${localString}</p>`
        // console.log("index", index, localString)
    })
}

const tableMenu_addButtonsListeners = () => {
    tableMenu_ButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableMenu_ButtonsInfo[index].id}`).addEventListener("click", tableMenu_ButtonsInfo[index].functionPerformed)
    })
}

export const tableMenu_createButtons = () => {
    tableMenu_addButtons()
    tableMenu_addButtonsDescriptions()
    tableMenu_addButtonsListeners()
}

// CHECKBOXES

const tableMenu_addCheckboxes = () => {
    const elementDivWithCheck = document.querySelector(".point5 .menuCheckboxes")
    console.log("element", elementDivWithCheck)
    let textDivWithCheck = ""

    tableMenu_CheckBoxInfo.forEach((element, index) => {
        textDivWithCheck += `<div class="checkboxDiv">
        <input type="checkbox" id="${element.id}" name="${element.name}" ${element.disabled} ${element.checked}>
        <label id="${element.labelId}" for="${element.labelFor}" class="${element.class}"> ${element.checkboxText}</label>
        </div>`
    })

    elementDivWithCheck.innerHTML = textDivWithCheck
}

const tableMenu_addChecboxesDescriptions = () => {
    const divElement = document.querySelector(".menuCheckboxesDescriptions");
    tableMenu_CheckBoxInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription footerDescription${index + 100}">${localString}</p>`
    })
}

function tableMenu_hideCheckboxesDescriptions() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")
    allCheckBoxes.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            allCheckBoxesDescription[index].classList.remove("footerDescriptionVisible")
        })
    })
}

function tableMenu_addCheckboxesListeners() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")

    tableMenu_ButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableMenu_ButtonsInfo[index].id}`).addEventListener("click", tableMenu_ButtonsInfo[index].functionPerformed)
    })

    allCheckBoxes.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            // console.log("listener mouse over")
            allCheckBoxesDescription[index].classList.add("footerDescriptionVisible")
        })
        element.addEventListener("mouseout", () => {
            // console.log("listener mouse out")
            allCheckBoxesDescription[index].classList.remove("footerDescriptionVisible")
        })
    })
}

export const tableMenu_createCheckboxes = () => {
    tableMenu_addCheckboxes()
    tableMenu_addChecboxesDescriptions()
    tableMenu_addCheckboxesListeners()
}


// SHOWING GREY BACKGROUND IN TABLE

export const tableMenu_checkboxGreyBackgroundChanged = () => {
    let checkBoxState = document.querySelector("#addGreyBackground")
    console.log("stan cheku greyBackground:", checkBoxState.checked)

    const classesToFind = convertClassesIntoOneString(classTableColumns)
    // console.log("classy do znalezienia", classesToFind)

    const element = document.querySelectorAll(classesToFind)
    // console.log("lista elementów", element)

    if (checkBoxState.checked) {
        element.forEach((element, index) => {
            if (!element.disabled) {
                element.classList.add("addGreyBackground")
                // console.log(index)
            }
        })
    } else {
        element.forEach((element, index) => {
            if (!element.disabled) {
                element.classList.remove("addGreyBackground")
                // console.log(index)
            }
        })
    }

}