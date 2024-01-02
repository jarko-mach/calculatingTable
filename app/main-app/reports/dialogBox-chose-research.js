"use strict"

import { dialogBox_chooseOldOrNewReport } from "./dialogBox-new-or-old-report.js";
import { tempInformations } from "../../miscellaneous/misc.js";
import { dialogBox_startNewReport } from "./dialogBox-new-name-report.js";

//// START - CHOOSE RESEARCH

export const dialogBox_chooseResearch = () => {
    let reportType = ""

    const getOKButton = () => {
        const radioGroupLightOrHealth = document.querySelectorAll("input[name=insertLightOrHealth]")
        // debugger
        for (const radio of radioGroupLightOrHealth) {
            if (radio.checked) {
                reportType = radio.labels[0].textContent
                break;
            }
        }

        getCancelButton();
        const elementHtml = document.querySelector(".entry")
        elementHtml.innerHTML = `SPRAWOZDANIE <br><br>${reportType}`
        tempInformations[0].reportType = reportType
        // console.log("1:",tempInformations[0].reportType)
        dialogBox_startNewReport()
    }

    const getCancelButton = () => {
        if (!reportType) {
            const endingElement = document.querySelector(".entry")
            endingElement.innerHTML = `<p>Dziękuję za współpracę i do zobaczenia następnym razem</p>`
        }
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    newElement.innerHTML =
        ` 
        <div class="dialogBox">
            <div class="dialogBoxHeader">Utwórz nowe sprawozdanie</div>
            <div class="dialogBoxChild">
                <fieldset class="fieldsetWidth">
                    <legend>Wybierz:</legend>
                    <div class="inputDiv">
                        <input type="radio" id="insertLight" name="insertLightOrHealth" value="light" checked>
                        <label for="insertLight">Badania oświetlenia elektrycznego</label>
                    </div>
                    <div class="inputDiv">
                        <input type="radio" id="insertHealth" name="insertLightOrHealth" value="health">
                        <label for="insertHealth">Badania czynników szkodliwych dla zdrowia w środowisku pracy</label>
                    </div>
                </fieldset>
                <div class="btnLayout">
                    <button class="okSave">Dalej</button>
                    <button class="noCancel">Anuluj</button>
                </div>
            </div>
        </div>  
      `

    foundElement.append(newElement)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)

    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)
}



