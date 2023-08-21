// import { etap1_FileNew } from "../etap-1-start.js"

// START DEFINITION OF BUTTONS IN MAIN MENU

let etap1_tableButtonsInfo = [
    {
        id: "buttonSave",
        class: "button",
        buttonText: "Zapisz",
        descriptionText: "<p>Zapisuje sprawozdanie lokalnie na dysku twardym</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { fileSave() },
    },
    {
        id: "buttonExport",
        class: "button",
        buttonText: "Eksportuj",
        descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { newTable() }, //exportDocument(), operationIsDone() 
    },
    {
        id: "buttonNew",
        class: "button",
        buttonText: "Nowe",
        descriptionText: `<p>Rozpoczyna nowe sprawozdanie`,
        disabled: "",
        functionPerformed: function () { etap1_FileNew() },
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
        id: "buttonRead",
        class: "button",
        buttonText: "1. Podstawa wykonania badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { }
    },
    
    {
        id: "buttonRead",
        class: "button",
        buttonText: "2. Cel badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { }
    },
    
    {
        id: "buttonRead",
        class: "button",
        buttonText: "3. Metodyka badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { }
    },
    
    {
        id: "buttonRead",
        class: "button",
        buttonText: "4. Miejsce i okoliczności badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { }
    },
    
    {
        id: "buttonRead",
        class: "button",
        buttonText: "5. Zestawienie badań",
        descriptionText: "<p>....</p>",
        descriptionClass: "footerDescription1",
        disabled: "",
        functionPerformed: function () { }
    },

]

// MENU and BUTTONS  

export function showStartingMenu() {

    const foundElement = document.querySelector(".openDialogBox")
    const newFooter = document.createElement("footer")
    newFooter.classList.add("menu")
    newFooter.innerHTML =
        `<div class="menuButtons"></div>
        <div class="menuDescriptions"></div>
        <div class="info">Wersja 2.01 <i>JM</i></div>
             `
    foundElement.before(newFooter)

    const elementDivWithButtons = document.querySelector(".menuButtons")
    let textDivWithButtons = `<p class="textMenu">SPRAWOZDANIE:</p>`

    for (let i = 0; i < etap1_tableButtonsInfo.length; i++) {
        let tempString = `<button id=${etap1_tableButtonsInfo[i].id} class=${etap1_tableButtonsInfo[i].class} ${etap1_tableButtonsInfo[i].disabled}> ${etap1_tableButtonsInfo[i].buttonText}</button>`
        textDivWithButtons += tempString
        if (i === 1) { textDivWithButtons += `<p class="textMenu">Utwórz:</p>` }
        if (i === 2) { textDivWithButtons += `<p class="textMenu">Zapisane lokalnie na dysku:</p>` }
        if (i === 3) { textDivWithButtons += `<p class="textMenu"><br>DODAJ:</p>` }
    }
    elementDivWithButtons.innerHTML = textDivWithButtons

    etap1_tableButtonsInfo.forEach((element, index) => {
        document.querySelector(`#${etap1_tableButtonsInfo[index].id}`).addEventListener("click", etap1_tableButtonsInfo[index].functionPerformed)
    })
}

// START

// etap1_ShowMainMenu()