"use strict";

import {
    tableAddTextBoldLine,
    tableAddTextLine,
    tableAddDataLine,
    tableAddEmptyLine,
    tableAddThinLine,
    tableRecalcAll,
    checkbox_RemoveTableRow_Changed,
    checkbox_ADDTableRow_Changed
} from "./table5a-operations.js";


import { currentTablNam } from "../miscellaneous/misc.js"

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
        descriptionClass: "tableMenuDescription1",
        disabled: "",
        functionPerformed: function () { tableRecalcAll(), operationIsDone() },
    },
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "Nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "tableMenuDescription2",
        disabled: "",
        functionPerformed: function () { tableAddTextBoldLine(), operationIsDone() },
        // tableMenu_checkboxGreyBackgroundChanged(),
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "Stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "tableMenuDescription3",
        disabled: "",
        functionPerformed: function () { tableAddTextLine(), operationIsDone() },
        // tableMenu_checkboxGreyBackgroundChanged(), 
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "Pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "tableMenuDescription4",
        disabled: "",
        functionPerformed: function () { tableAddDataLine(), operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "Pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "tableMenuDescription5",
        disabled: "",
        functionPerformed: function () { tableAddEmptyLine(), operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "Linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "tableMenuDescription6",
        disabled: "",
        functionPerformed: function () { tableAddThinLine(), operationIsDone() },
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
        descriptionClass: "tableMenuDescription101",
        functionPerformed: function () { checkbox_RemoveTableRow_Changed() },
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
        descriptionClass: "tableMenuDescription101",
        functionPerformed: function () { checkbox_ADDTableRow_Changed() },
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
        descriptionClass: "tableMenuDescription102",
        functionPerformed: function () { tableMenu_checkboxGreyBackgroundChanged() },
    },
    {
        id: "showDescriptions",
        name: "showDescriptions",
        checked: "",
        disabled: "",
        labelId: "labelCB4",
        labelFor: "showDescriptions",
        class: "labelCB",
        checkboxText: "opis przycisków",
        descriptionText: "<p>Włącza / wyłącza pojawianie się pól z wyjaśnieniami</p>",
        descriptionClass: "tableMenuDescription103",
        functionPerformed: function () { tableMenu_ShowHideAllDescriptions() },
    },
]

// IN TABLE MENU ----------- ADD BUTTONS AND CHECKBOXES

// BUTTONS 

function tableMenu_addButtons(tableName) {
    const elementDivWithButtons = document.querySelector(`.point5 .${tableName} .menuButtons`)
    const elementDivWithButtonsInLine = document.querySelector(`.point5 .${tableName} .menuButtonsInLine`)
    // console.log("1", tableName, elementDivWithButtons)
    let textDivWithButtons = ``
    let textDivWithButtonsInLine = ``

    for (let i = 0; i < tableMenu_ButtonsInfo.length; i++) {
        let tempString = `<button id=${tableMenu_ButtonsInfo[i].id} 
                                 data-tablename="${tableName}" 
                                 class=${tableMenu_ButtonsInfo[i].class} ${tableMenu_ButtonsInfo[i].disabled}> 
                                       ${tableMenu_ButtonsInfo[i].buttonText}
                          </button>`
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

const buttons_findTableName = (evt) => {
    currentTablNam[0] = evt.currentTarget.dataset.tablename
    console.log("kliknięte btn..", evt.currentTarget.dataset.tablename)
}

const checkboxes_findTableName = (evt) => {
    let element = evt.target
    currentTablNam[0] = element.dataset.tablename
    console.log("kliknięte check..??..", element)
}

const tableMenu_addButtonsListeners = (tableName) => {
    tableMenu_ButtonsInfo.forEach((element, index) => {
        let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_ButtonsInfo[index].id}`)
        myElement.addEventListener("click", buttons_findTableName)
        myElement.addEventListener("click", tableMenu_ButtonsInfo[index].functionPerformed)
    })
}

const tableMenu_addButtonsDescriptions = (tableName) => {
    const divElement = document.querySelector(`.point5 .${tableName}  .menuButtonsDescriptions`);
    tableMenu_ButtonsInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription tableMenuDescription${index + 1}">
                                 <boldi>${element.buttonText}<br></boldi> ${localString}</p>`
        // console.log("index", index, localString)
    })
}

export const tableMenu_createButtons = (tableName) => {
    tableMenu_addButtons(tableName)
    tableMenu_addButtonsListeners(tableName)
    tableMenu_addButtonsDescriptions(tableName)
}

// CHECKBOXES

const tableMenu_addCheckboxes = (tableName) => {
    const elementDivWithCheck = document.querySelector(`.point5 .${tableName} .menuCheckboxes`)
    let textDivWithCheck = ""

    tableMenu_CheckBoxInfo.forEach((element, index) => {
        textDivWithCheck += `<div class="checkboxDiv" >
        <input type="checkbox" id="${element.id}" data-tablename="${tableName}" name="${element.name}" ${element.disabled} ${element.checked}>
        <label class="${element.class} ${element.labelId}" data-tablename="${tableName}"> ${element.checkboxText}</label>
        </div>`
    })
    elementDivWithCheck.innerHTML = textDivWithCheck
}

const tableMenu_addCheckboxesListeners = (tableName) => {
    // console.log("tableMenu_addCheckboxesListeners", tableName)
    tableMenu_CheckBoxInfo.forEach((element, index) => {
        let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_CheckBoxInfo[index].id}`)
        myElement.addEventListener("click", checkboxes_findTableName)
        myElement.addEventListener("click", tableMenu_CheckBoxInfo[index].functionPerformed)
    })
}

const tableMenu_addChecboxesDescriptions = (tableName) => {
    const divElement = document.querySelector(`.point5 .${tableName} .menuCheckboxesDescriptions`);
    tableMenu_CheckBoxInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription tableMenuDescription${index + 100}">
                                    <boldi>${element.checkboxText}<br></boldi>
                                    ${localString}</p>`
    })
}

export const tableMenu_createCheckboxes = (tableName) => {
    tableMenu_addCheckboxes(tableName)
    tableMenu_addCheckboxesListeners(tableName)
    tableMenu_addChecboxesDescriptions(tableName)
}

////// IN TABLE MENU ----------- SHOW / HIDE DESCRIPTIONS

// Buttons

const show_ButtonsDescriptions = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableMenu_ButtonsInfo.findIndex(element => element.id === found)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.${elem.srcElement.dataset.tablename} .menuButtonsDescriptions .tableMenuDescription${myIndexFound + 1}`)
        // console.log(`.tableMenuDescription${myIndexFound + 1}`, "pElement", pElement)
        pElement.classList.add("tableMenuDescriptionVisible")
    }
}

const hide_ButtonsDescriptions = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableMenu_ButtonsInfo.findIndex(element => element.id === found)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.${elem.srcElement.dataset.tablename} .menuButtonsDescriptions .tableMenuDescription${myIndexFound + 1}`);
        pElement.classList.remove("tableMenuDescriptionVisible")
    }
}

const tableMenu_addRemove_ButtonsDescriptionsListeners = (tableName) => {

    if (!tableName) { tableName = currentTablNam[0] }
    let checkBoxState = document.querySelector(`.point5 .${tableName} #showDescriptions`)
    // console.log("checkBoxState.checked buttons", checkBoxState.checked)

    if (checkBoxState.checked) {
        // console.log("++ opis buttonów", checkBoxState.checked)

        tableMenu_ButtonsInfo.forEach((element, index) => {
            let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_ButtonsInfo[index].id}`)
            // console.log("my element - dodawando", myElement)
            myElement.addEventListener("mouseover", show_ButtonsDescriptions)
            myElement.addEventListener("mouseout", hide_ButtonsDescriptions)
        })

    } else {
        // console.log("-- opis buttonów", checkBoxState.checked)
        tableMenu_ButtonsInfo.forEach((element, index) => {
            let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_ButtonsInfo[index].id}`)
            // console.log("-- opis buttonów", myElement)
            myElement.removeEventListener("mouseover", show_ButtonsDescriptions)
            myElement.removeEventListener("mouseout", hide_ButtonsDescriptions)
        })
    }
}

// CheckBoxes

const show_CheckboxesDescriptions = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableMenu_CheckBoxInfo.findIndex(element => element.id === found)
    // console.log("pokaż opis checkboxy found", found, myIndexFound)

    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.${elem.srcElement.dataset.tablename} .tableMenuDescription${myIndexFound + 100}`)
        // console.log("- dodawando", pElement)
        pElement.classList.add("tableMenuDescriptionVisible")
    }
}

const hide_CheckboxesDescriptions = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableMenu_CheckBoxInfo.findIndex(element => element.id === found)
    // console.log("ukryj opis checkboxy found", found, myIndexFound)

    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.${elem.srcElement.dataset.tablename} .tableMenuDescription${myIndexFound + 100}`)
        // console.log("- odejmowando", pElement)
        pElement.classList.remove("tableMenuDescriptionVisible")
    }
}

const tableMenu_addRemove_CheckboxesDescriptionsListeners = (tableName) => {
    if (!tableName) { tableName = currentTablNam[0] }
    let checkBoxState = document.querySelector(`.point5 .${tableName} #showDescriptions`)
    // console.log("checkBoxState.checked checkboxes", checkBoxState.checked)

    if (checkBoxState.checked) {
        // console.log("++ opis checków", checkBoxState.checked)

        tableMenu_CheckBoxInfo.forEach((element, index) => {
            let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_CheckBoxInfo[index].id}`)
            myElement.addEventListener("mouseover", show_CheckboxesDescriptions)
            myElement.addEventListener("mouseout", hide_CheckboxesDescriptions)
        })
    } else {
        // console.log("-- opis checków", checkBoxState.checked)
        tableMenu_CheckBoxInfo.forEach((element, index) => {
            let myElement = document.querySelector(`.point5 .${tableName} #${tableMenu_CheckBoxInfo[index].id}`)
            myElement.removeEventListener("mouseover", show_CheckboxesDescriptions)
            myElement.removeEventListener("mouseout", hide_CheckboxesDescriptions)
            if (tableMenu_CheckBoxInfo[index].id === "showDescriptions") {
                console.log("została desc")
                const pElement = document.querySelector(`.${tableName} .tableMenuDescription${index + 100}`)
                pElement.classList.remove("tableMenuDescriptionVisible")
            }
        })
    }
}

export const tableMenu_ShowHideAllDescriptions = (tableName) => {
    tableMenu_addRemove_ButtonsDescriptionsListeners(tableName)
    tableMenu_addRemove_CheckboxesDescriptionsListeners(tableName)
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