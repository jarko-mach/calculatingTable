"use strict";

import { addPoint_1, addPoint_2, addPoint_3, addPoint_4, addPoint_5 } from "./main_points15.js"
import { saveAll, readAll } from "./app.js";
import { dialogBox_startNewReport } from "./main-dialog-boxes.js";
import { operationIsDone } from "../miscellaneous/misc.js";

let mainMenu_tableButtonsInfo = [
    {
        id: "buttonSave",
        class: "buttons",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje sprawozdanie lokalnie na dysku twardym</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { saveAll(), operationIsDone() },
    },
    {
        id: "buttonExport",
        class: "buttons",
        buttonText: "Eksportuj",
        descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { alert("tu chyba na razie nic nie będzie") }
    },
    {
        id: "buttonNew",
        class: "buttons",
        buttonText: "Nowe",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie`,
        disabled: "",
        functionPerformed: function () { dialogBox_startNewReport() },
    },
    {
        id: "buttonRead",
        class: "buttons",
        buttonText: "Wczytaj",
        descriptionText: "<p>Może istnieć kilka sprawozdań, każde z inną nazwą. Tutaj można wybrać określone sprawozdanie z rozwijanej listy.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { readAll() }
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

export function createMainMenu() {
    const foundElement = document.querySelector(".openDialogBox")
    // debugger
    let foundNewFooter = document.querySelector("footer")
    if (!foundNewFooter) { foundNewFooter = document.createElement("footer") }
    foundNewFooter.classList.add("menuBackground")
    foundNewFooter.innerHTML =
        `<div class="menuElements"></div>
         <div class="mainMenuDescriptions"></div>
         <div class="info">Wersja 2.01 <i>JM</i></div>
             `
    foundElement.before(foundNewFooter)

    const elementDivWithButtons = document.querySelector(".menuElements")
    let textDivWithButtons = `<p class="textMenu">SPRAWOZDANIE:</p>`

    for (let i = 0; i < mainMenu_tableButtonsInfo.length; i++) {
        let tempString = `<button id=${mainMenu_tableButtonsInfo[i].id} 
                            class=${mainMenu_tableButtonsInfo[i].class} ${mainMenu_tableButtonsInfo[i].disabled}> 
                            ${mainMenu_tableButtonsInfo[i].buttonText}
                           </button>`
        textDivWithButtons += tempString
        if (i === 1) { textDivWithButtons += `<p class="textMenu">Utwórz:</p>` }
        if (i === 2) { textDivWithButtons += `<p class="textMenu">Zapisane lokalnie na dysku:</p>` }
        if (i === 3) { textDivWithButtons += `<p class="textMenu">DODAJ:</p>` }
    }
    elementDivWithButtons.innerHTML = textDivWithButtons

    mainMenu_tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${mainMenu_tableButtonsInfo[index].id}`).addEventListener("click", mainMenu_tableButtonsInfo[index].functionPerformed)
    })
}

