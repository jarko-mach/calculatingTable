"use strict";


let mainMenu_tableButtonsInfo = [

    {
        id: "buttonNew",
        class: "buttons",
        buttonText: "Nowe",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie`,
        disabled: "",
        functionPerformed: function () { dialogBox_startNewReport() },
    },
    {
        id: "buttonSave",
        class: "buttons",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje sprawozdanie lokalnie na dysku twardym</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { operationIsDone_andSaveAll() },
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
        functionPerformed: function () { addNewPoint_1() }
    },
    {
        id: "buttonPoint2",
        class: "buttons",
        hrefID: "point2",
        buttonText: "2. Cel badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addNewPoint_2() }
    },
    {
        id: "buttonPoint3",
        class: "buttons",
        hrefID: "point3",
        buttonText: "3. Metodyka badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addNewPoint_3() }
    },
    {
        id: "buttonPoint4",
        class: "buttons",
        hrefID: "point4",
        buttonText: "4. Miejsce i okoliczności badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addNewPoint_4() }
    },
    {
        id: "buttonPoint5",
        class: "buttons",
        hrefID: "point5",
        buttonText: "5. Zestawienie badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { addNewPoint_5() }
    },

    // {
    //     id: "buttonExport",
    //     class: "buttons",
    //     buttonText: "Eksportuj",
    //     descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
    //     descriptionClass: "footerDescription1",
    //     disabled: "",
    //     functionPerformed: function () { alert("tu chyba na razie nic nie będzie") }
    // },
]

export function createMainMenu() {
    const foundElement = document.querySelector(".openDialogBox")
    let foundMainMenu = document.querySelector(".mainMenu")
    // console.log("found mainMenu", foundMainMenu)
    // debugger
    if (!foundMainMenu) { foundMainMenu = document.createElement("div") }
    foundMainMenu.classList.add("mainMenu")
    foundMainMenu.classList.add("menuBackground")
    foundMainMenu.innerHTML =
        `<div class="menuElements"></div>
         <div class="mainMenuDescriptions"></div>
         <div class="info">Wersja 2.01 <i>JM</i></div>
             `
    foundElement.before(foundMainMenu)

    const elementDivWithButtons = document.querySelector(".mainMenu .menuElements")
    let textDivWithButtons = `<p class="textMenu">SPRAWOZDANIE:</p><p class="textMenu">Utwórz</p>`

    for (let i = 0; i < mainMenu_tableButtonsInfo.length; i++) {
        let tempString = `<button id=${mainMenu_tableButtonsInfo[i].id} 
                            class=${mainMenu_tableButtonsInfo[i].class} ${mainMenu_tableButtonsInfo[i].disabled}> 
                            ${mainMenu_tableButtonsInfo[i].buttonText}
                           </button>`
        textDivWithButtons += tempString
        if (i === 1) { textDivWithButtons += `<p class="textMenu">Zapisane lokalnie na dysku:</p>` }
        if (i === 2) { textDivWithButtons += `<p class="textMenu">DODAJ:</p>` }
    }
    elementDivWithButtons.innerHTML = textDivWithButtons

    mainMenu_tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${mainMenu_tableButtonsInfo[index].id}`).addEventListener("click", mainMenu_tableButtonsInfo[index].functionPerformed)
    })
}

