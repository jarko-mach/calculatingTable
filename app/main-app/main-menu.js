"use strict";

import { point5_selectTableType } from "./app.js";

// START DEFINITION OF BUTTONS IN MAIN MENU

let etap1_tableButtonsInfo = [
    {
        id: "buttonSave",
        class: "buttons",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje sprawozdanie lokalnie na dysku twardym</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { fileSave() },
    },
    {
        id: "buttonExport",
        class: "buttons",
        buttonText: "Eksportuj",
        descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { newTable() }, //exportDocument(), operationIsDone() 
    },
    {
        id: "buttonNew",
        class: "buttons",
        buttonText: "Nowe",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie`,
        disabled: "",
        functionPerformed: function () { etap1_FileNew() },
    },
    {
        id: "buttonRead",
        class: "buttons",
        buttonText: "Wczytaj",
        descriptionText: "<p>Może istnieć kilka sprawozdań, każde z inną nazwą. Tutaj można wybrać określone sprawozdanie z rozwijanej listy.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { fileRead() }
    },

    {
        id: "buttonPoint1",
        class: "buttons",
        hrefID: "point1",
        buttonText: "1. Podstawa wykonania badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addPoint_1() }
    },

    {
        id: "buttonPoint2",
        class: "buttons",
        hrefID: "point2",
        buttonText: "2. Cel badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addPoint_2() }
    },

    {
        id: "buttonPoint3",
        class: "buttons",
        hrefID: "point3",
        buttonText: "3. Metodyka badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addPoint_3() }
    },

    {
        id: "buttonPoint4",
        class: "buttons",
        hrefID: "point4",
        buttonText: "4. Miejsce i okoliczności badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addPoint_4() }
    },

    {
        id: "buttonPoint5",
        class: "buttons",
        hrefID: "point5",
        buttonText: "5. Zestawienie badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addPoint_5() }
    },

]

// MENU and BUTTONS  

export function createMainMenu() {

    const foundElement = document.querySelector(".openDialogBox")
    const newFooter = document.createElement("footer")
    newFooter.classList.add("menuBackground")
    newFooter.innerHTML =
        `<div class="menuElements"></div>
         <div class="mainMenuDescriptions"></div>
         <div class="info">Wersja 2.01 <i>JM</i></div>
             `
    foundElement.before(newFooter)

    const elementDivWithButtons = document.querySelector(".menuElements")
    let textDivWithButtons = `<p class="textMenu">SPRAWOZDANIE:</p>`

    for (let i = 0; i < etap1_tableButtonsInfo.length; i++) {
        let tempString = `<button id=${etap1_tableButtonsInfo[i].id} 
                            class=${etap1_tableButtonsInfo[i].class} ${etap1_tableButtonsInfo[i].disabled}> 
                            ${etap1_tableButtonsInfo[i].buttonText}
                           </button>`
        textDivWithButtons += tempString
        if (i === 1) { textDivWithButtons += `<p class="textMenu">Utwórz:</p>` }
        if (i === 2) { textDivWithButtons += `<p class="textMenu">Zapisane lokalnie na dysku:</p>` }
        if (i === 3) { textDivWithButtons += `<p class="textMenu">DODAJ:</p>` }
    }
    elementDivWithButtons.innerHTML = textDivWithButtons

    etap1_tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${etap1_tableButtonsInfo[index].id}`).addEventListener("click", etap1_tableButtonsInfo[index].functionPerformed)
    })
}

const addingPointsTable = [0, 0, 0, 0, 0, 0]

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ante eu urna vestibulum accumsan. Nulla facilisi. Sed consequat quam sem, ac gravida libero dictum a. Donec mollis velit scelerisque erat iaculis commodo. Maecenas interdum neque vel dui"

const findPreviousDiv = (number) => {
    for (let index = number - 1; index > 0; index--) {
        const foundElement = document.querySelector(`.point${index}`)
        if (foundElement) {
            return `.point${index}`
        }
    }
    return ".entry"
}

const createDivPoints = (number) => {
    if (addingPointsTable[number] === 0) {
        addingPointsTable[number] = 1
        const foundElement = document.querySelector(findPreviousDiv(number))
        const newDiv = document.createElement("div")
        newDiv.classList.add(`point${number}`)

        let mainText = ""
        switch (number) {
            case 1:
                mainText = `1. PODSTAWA WYKONANIA BADAŃ`
                break;
            case 2:
                mainText = `2. CEL BADAŃ`
                break;
            case 3:
                mainText = `3. METODYKA BADAŃ`
                break;
            case 4:
                mainText = `4. MIEJSCE I OKOLICZNOŚCI BADAŃ`
                break;
            case 5:
                mainText = `5. ZESTAWIENIE BADAŃ`
                break;
            default:
                console.log(`Sorry, we are out of ${number}.`);
        }

        newDiv.innerHTML =
            `
                <p class="reportSubtitle">
                    <a id="point${number}"> <br> ${mainText} <br> </a>
                    <p style="color:darkgray;font-size:12px;">${loremIpsum}</p>
                </p>`
        foundElement.after(newDiv)
    }
    document.getElementById(`point${number}`).scrollIntoView()
}

const addPoint_1 = () => {
    createDivPoints(1)
}

const addPoint_2 = () => {
    createDivPoints(2)
}
const addPoint_3 = () => {
    createDivPoints(3)
}
const addPoint_4 = () => {
    createDivPoints(4)
}

const addPoint_5 = () => {
    createDivPoints(5)
    point5_selectTableType()
}




