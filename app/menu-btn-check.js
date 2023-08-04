import {
    classTableColumns,
    recalcAll,
    convertClassesIntoOneString,
    readReport,
    readDoc,
    operationIsDone
} from "./app.js"

import {
    tableAddTextLine,
    tableAddTextBoldLine,
    tableAddDataLine,
    tableAddEmptyLine,
    tableAddThinLine,
    removeTableRow,
    checkboxRemoveTableRowChanged,
    checkboxADDTableRowChanged
} from "./table-operations.js"

import {
    fileNew,
    fileSave,
    fileRead
} from "./file-new-save-read.js"

import {
    newTable
} from "./export-word-docx.js"


// START DEFINITION OF BUTTONS IN MENU

export let tableButtonsInfo = [
    {
        id: "buttonNew",
        class: "button",
        buttonText: "Nowa",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie / nową tabelę nr 1. Dla nowego sprawozdania wymagana jest nowa nazwa.<br>
            Dalsze prace odbywać się będą pod ustaloną nazwą, aktywne będą pozostałe klawisze. <br>
            Nazwa musi mieć co najmniej 5 znaków, nie może mieć kropek i przecinków, maksymalnie obok siebie może być tylko 1 spacja</p>`,
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { fileNew() },
    },
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje zawartość widocznej tabelki lokalnie na dysku twardym</p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { fileSave() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Może istnieć kilka sprawozdań, każde z inną nazwą. Tutaj można wybrać określone sprawozdanie z rozwijanej listy.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { fileRead() }
    },
    {
        id: "buttonExport",
        class: "button",
        buttonText: "Eksportuj",
        descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { newTable() }, //exportDocument(), operationIsDone() 
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
        disabled: "disabled",
        functionPerformed: function () { tableAddTextBoldLine(), menu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddTextLine(); menu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddDataLine(); menu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddEmptyLine(); menu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "footerDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddThinLine(); menu_checkboxGreyBackgroundChanged(), operationIsDone() },
    },
]

// START DEFINITION OF CHECKBOXES IN MENU

let tableCheckBoxInfo = [
    {
        id: "removeTableRow",
        name: "removeTableRow",
        checked: "",
        disabled: "disabled",
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
        disabled: "disabled",
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
        disabled: "disabled",
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



// BUTTONS  

function menu_addButtons() {
    const elementDivWithButtons = document.querySelector(".menuButtons")
    const elementDivWithButtonsInLine = document.querySelector(".menuButtonsInLine")
    let textDivWithButtons = ``
    let textDivWithButtonsInLine = ``

    for (let i = 0; i < tableButtonsInfo.length; i++) {
        let tempString = `<button id=${tableButtonsInfo[i].id} class=${tableButtonsInfo[i].class} ${tableButtonsInfo[i].disabled}> ${tableButtonsInfo[i].buttonText}</button>`
        // left menu
        if (i <= 4) {
            if (i === 0) { textDivWithButtons += `<p class="textMenu">Tabela z danymi:</p>` }
            if (i === 4) { textDivWithButtons += `<p class="textMenu">Sprawdź poprawność:</p>` }
            textDivWithButtons += tempString
            // console.log(i, tableButtonsInfo[i].id)
        }
        // under table
        if (i > 4) {
            if (i === 5) { textDivWithButtonsInLine += `<p class="textMenu">Dodaj na końcu tabeli:</p>` }
            textDivWithButtonsInLine += tempString
        }
    }

    textDivWithButtons += `<p class="textMenu">Włącz/Wyłącz:</p>`
    elementDivWithButtons.innerHTML = textDivWithButtons
    elementDivWithButtonsInLine.innerHTML = textDivWithButtonsInLine
}

const menu_addButtonsDescriptions = () => {
    const divElement = document.querySelector(".menuDescriptions");
    tableButtonsInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription footerDescription${index + 1}">${localString}</p>`
        // console.log("index", index, localString)
    })
}

const menu_addButtonsListeners = () => {
    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
    })
}

export const menu_buttons = () => {
    menu_addButtons()
    menu_addButtonsDescriptions()
    menu_addButtonsListeners()
}

// CHECKBOXES

const menu_addCheckboxes = () => {
    const elementDivWithCheck = document.querySelector(".menuCheckboxes")
    let textDivWithCheck = ""

    tableCheckBoxInfo.forEach((element, index) => {
        textDivWithCheck += `<div class="checkboxDiv">
        <input type="checkbox" id="${element.id}" name="${element.name}" ${element.disabled} ${element.checked}>
        <label id="${element.labelId}" for="${element.labelFor}" class="${element.class}"> ${element.checkboxText}</label>
        </div>`
        // console.log("element.checked", element.checked)
    })

    elementDivWithCheck.innerHTML = textDivWithCheck
}

const menu_addChecboxesDescriptions = () => {
    const divElement = document.querySelector(".menuCheckboxesDescriptions");
    tableCheckBoxInfo.forEach((element, index) => {
        let localString = element.descriptionText.slice(3, element.descriptionText.length - 4)
        divElement.innerHTML += `<p class="allDescription footerDescription${index + 100}">${localString}</p>`
    })
}

function menu_hideCheckboxesDescriptions() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")
    allCheckBoxes.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            allCheckBoxesDescription[index].classList.remove("footerDescriptionVisible")
        })
    })
}

function menu_addCheckboxesListeners() {
    const allCheckBoxes = document.querySelectorAll(".checkboxDiv")
    const allCheckBoxesDescription = document.querySelectorAll(".menuCheckboxesDescriptions p")

    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
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

export const menu_checkboxes = () => {
    menu_addCheckboxes()
    menu_addChecboxesDescriptions()
    menu_addCheckboxesListeners()
}


//////  SHOW HIDE DESCRIPTIONS

// dodaje classę visible do opisu/pomocy buttonów 

const showButtonHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    // console.log("found", found, "myIndexFound", myIndexFound + 1)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.footerDescription${myIndexFound + 1}`);
        // console.log(`.footerDescription${myIndexFound + 1}`, "pElement", pElement)
        pElement.classList.add("footerDescriptionVisible")
    }
}

// usuwa classę visible z opisu/pomocy buttonów 

const hideButtonHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(`.footerDescription${myIndexFound + 1}`);
        pElement.classList.remove("footerDescriptionVisible")
    }
}

// checkbox 'opis przycisków': włącza i wyłącza wyświetlanie opisu/pomocy

export const menu_checkboxShowHideAllDescriptions = () => {
    let checkBoxState = document.querySelector("#showDescriptions")
    const allButtons = document.querySelectorAll(".menuButtons .button, .menuButtonsInLine")

    if (checkBoxState.checked) {
        allButtons.forEach((element, index) => {
            element.addEventListener("mouseover", showButtonHelp)
            element.addEventListener("mouseout", hideButtonHelp)
        })
        menu_addCheckboxesListeners()
    } else {
        allButtons.forEach((element, index) => {
            element.removeEventListener("mouseover", showButtonHelp)
            element.removeEventListener("mouseout", hideButtonHelp)
        })
        menu_hideCheckboxesDescriptions()
    }
}


// PRINTING

export const prepareToPrint = () => {
    document.querySelector("footer").classList.toggle("footerHide")
}


// SHOWING GREY BACKGROUND IN TABLE

export const menu_checkboxGreyBackgroundChanged = () => {
    let checkBoxState = document.querySelector("#addGreyBackground")
    // console.log("stan cheku", checkBoxState.checked)

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

// LISTENERS

export const menu_addListeners = () => {
    document.querySelector(".table1Text").addEventListener("click", prepareToPrint)
    document.querySelector("#removeTableRow").addEventListener("click", checkboxRemoveTableRowChanged)
    document.querySelector("#addTableRow").addEventListener("click", checkboxADDTableRowChanged)
    document.querySelector("#addGreyBackground").addEventListener("click", menu_checkboxGreyBackgroundChanged)
    document.querySelector("#showDescriptions").addEventListener("click", menu_checkboxShowHideAllDescriptions)
}


//  SETS THE CURRENT STATE OF THE BUTTONS

export const setButtonsEnabledDisabled = (expr) => {

    const findButtonsIndex = (buttonName) => {
        let myIndexFound = tableButtonsInfo.findIndex(element => element.id === buttonName)
        return myIndexFound
    }

    const findCheckBoxIndex = (checkName) => {
        let myIndexFound = tableCheckBoxInfo.findIndex(element => element.id === checkName)
        // console.log("myIndexFound check", myIndexFound)
        return myIndexFound
    }

    switch (expr) {
        case 'startApp':
            tableButtonsInfo[findButtonsIndex("buttonNew")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonSave")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonRead")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonExport")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonRecalc")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonAddHeader")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonAddPlace")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonAdd")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonAddSpace")].disabled = "disabled"
            tableButtonsInfo[findButtonsIndex("buttonAddThinLine")].disabled = "disabled"

            tableCheckBoxInfo[findCheckBoxIndex("removeTableRow")].disabled = "disabled"
            tableCheckBoxInfo[findCheckBoxIndex("removeTableRow")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("addTableRow")].disabled = "disabled"
            tableCheckBoxInfo[findCheckBoxIndex("addTableRow")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("addGreyBackground")].disabled = "disabled"
            tableCheckBoxInfo[findCheckBoxIndex("addGreyBackground")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("showDescriptions")].disabled = ""
            tableCheckBoxInfo[findCheckBoxIndex("showDescriptions")].checked = "checked"
            break;

        case 'tableNew':

        case 'tableSaved':

        case 'tableReaded':
            tableButtonsInfo[findButtonsIndex("buttonNew")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonSave")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonRead")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonExport")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonRecalc")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonAddHeader")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonAddPlace")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonAdd")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonAddSpace")].disabled = ""
            tableButtonsInfo[findButtonsIndex("buttonAddThinLine")].disabled = ""

            tableCheckBoxInfo[findCheckBoxIndex("removeTableRow")].disabled = ""
            tableCheckBoxInfo[findCheckBoxIndex("removeTableRow")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("addTableRow")].disabled = ""
            tableCheckBoxInfo[findCheckBoxIndex("addTableRow")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("addGreyBackground")].disabled = ""
            tableCheckBoxInfo[findCheckBoxIndex("addGreyBackground")].checked = ""
            tableCheckBoxInfo[findCheckBoxIndex("showDescriptions")].disabled = ""
            tableCheckBoxInfo[findCheckBoxIndex("showDescriptions")].checked = ""
            break;

        case 'zapisano':
            // console.log('............');
            break;
        default:
        // console.log(`Sorry, we are out of ${expr}.`);
    }
    menu_buttons()
    menu_checkboxes()
    menu_checkboxShowHideAllDescriptions()
    menu_addListeners()
}
