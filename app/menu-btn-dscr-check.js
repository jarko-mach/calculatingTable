import { recalcAll, convertClassesIntoOneString, readReport, readDoc, operationIsDone } from "./app.js"
import { tableAddTextLine, tableAddTextBoldLine, tableAddDataLine, tableAddEmptyLine, tableAddThinLine } from "./table-operations.js"
import { fileSaveAs, fileSave, fileNew } from "./misc.js"
import { generate } from "./misc.js"

let tableButtonsInfo = [
    {
        id: "buttonNew",
        class: "button",
        buttonText: "Nowa",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie. Dla nowego sprawozdania wymagana jest nowa nazwa.<br>Dalsze prace odbywać się będą pod ustaloną nazwą, 
                            aktywny będą pozostałe klawisze</p>`,
        descriptionClass: "footerDisplayDescription1",
        disabled: "",
        functionPerformed: function () { fileNew() },
        //  saveReportAndTable(), operationIsDone() },
    },
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje zawartość tabelki lokalnie na dysku</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { fileSaveAs() },
        //  saveReportAndTable(), operationIsDone() },
    },
    {
        id: "buttonRead",
        class: "button",
        buttonText: "Wczytaj",
        descriptionText: "<p>Odczytuje sprawozdanie zapisane wcześniej lokalnie na dysku</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "",
        functionPerformed: function () { readDoc(); readReport(); checkboxesDisabledFalse(this), operationIsDone() },
    },
    {
        id: "buttonExport",
        class: "button",
        buttonText: "Eksportuj",
        descriptionText: "<p>zobaczymy........</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { generate(), operationIsDone() },
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
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { recalcAll(), operationIsDone() },
    },
    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddTextBoldLine(), checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddTextLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddDataLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddEmptyLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "footerDisplayDescription1",
        disabled: "disabled",
        functionPerformed: function () { tableAddThinLine(); checkboxesDisabledFalse(), operationIsDone() },
    },
]

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
        descriptionClass: "footerDisplayDescription101",
        functionPerformed: function () { },
    },
    {
        id: "addGreyBackground",
        name: "addGreyBackground",
        checked: "",
        disabled: "disabled",
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
        checked: "checked",
        disabled: "",
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
                                <input type="checkbox" id="${element.id}" name="${element.name}" ${element.disabled} ${element.checked}>
                                <label id="${element.labelId}" for="${element.labelFor}" class="${element.class}"> ${element.checkboxText}</label>
                             </div>`
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
    // console.log("allCheckBoxes", allCheckBoxes)
    // console.log("allCheckBoxesDescription", allCheckBoxesDescription)

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
            console.log(i, tableButtonsInfo[i].id)
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

    tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${tableButtonsInfo[index].id}`).addEventListener("click", tableButtonsInfo[index].functionPerformed)
    })
}

const showHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    // console.log("found",found, myIndexFound)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(".footerDisplayDescription" + myIndexFound);
        pElement.classList.add("footerDisplayDescriptionVisible")

    }
}

const hideHelp = elem => {
    let found = elem.srcElement.id
    let myIndexFound = tableButtonsInfo.findIndex(element => element.id === found)
    if (myIndexFound !== -1) {
        const pElement = document.querySelector(".footerDisplayDescription" + myIndexFound);
        pElement.classList.remove("footerDisplayDescriptionVisible")
    }
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
    const allButtons = document.querySelectorAll(".menuButtons .button, .menuButtonsInLine")

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


// CHECK POSIBILITY OF SAVE'ING REPORT AND TABLE 1

// export const checkToUnblockSaveButton = () => {
//     // classy użyte do nagłówka i danych klienta
//     const tableThreeColumns = ["numberTSO", "yearTSO", "pageTSO", "pagesTSO"]

//     let readedClassesFromTable = convertClassesIntoOneString(tableThreeColumns)
//     console.log("readedClassesFromTable", readedClassesFromTable)

//     const findCustomerAndDate = `, #customerName, #researchAddress, #researchDate`
//     readedClassesFromTable += findCustomerAndDate
//     const nodeList = document.querySelectorAll(readedClassesFromTable)


//     let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))

//     // element 1 - numberTSO
//     dataReport.numberTSO = nodeList[0].value

//     // element 2 - year
//     dataReport.year = nodeList[1].value

//     // element 3 - page
//     dataReport.page = nodeList[2].value

//     // element 4 - pages
//     dataReport.pages = nodeList[3].value

//     // element 5 - customer
//     dataReport.customer = nodeList[4].value

//     // element 6 - placesof 
//     dataReport.placeOfMeasurings = nodeList[5].value

//     // element 7 - date
//     dataReport.dateOfMeasurings = nodeList[6].value

//     // element 8 - tables
//     // dataReport.tables = nodeList[7].value
//     console.log("tabela:", dataReport)
//     console.log("JSON", JSON.stringify(dataReport))
//     localStorage.setItem("testowy", JSON.stringify(dataReport))
// }
