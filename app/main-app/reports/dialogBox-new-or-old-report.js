"use strict"

import { dialogBox_chooseExistingReport } from "./dialogBox-old-read-reports.js"
import { dialogBox_startNewReport } from "./dialogBox-new-name-report.js"
// import { remove_Point5_html } from "../../points-all/point-5/point-5-remove.js"
// import { createStandardTable_5a } from "../../points-all/point-5/table5a-lighting/table5a-createTable.js"

////// START - CHOOSE REPORT - dialogBox_startNewReport()  or  dialogBox_readExistingReport()

export const dialogBox_chooseOldOrNewReport = () => {
    let whatNext = ""

    const getOKButton = () => {
        const radioGroupNewOrOld = document.querySelectorAll("input[name=insertNewOrOld]")
        for (const radio1 of radioGroupNewOrOld) {
            if (radio1.checked) {
                whatNext = radio1.value;
                break;
            }
        }
        getCancelButton();

        if (whatNext === "new") dialogBox_startNewReport()
        if (whatNext === "existing") dialogBox_chooseExistingReport()
    }

    const getCancelButton = () => {
        if (!whatNext) {
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
            <div class="dialogBoxHeader"> Sprawozdanie
            </div>
            <div class="dialogBoxChild">
                <fieldset class="fieldsetWidth">
                    <legend>Wybierz:</legend>
                    <div class="inputDiv">
                        <input type="radio" id="insertExisting" name="insertNewOrOld" value="existing" checked>
                        <label for="insertExisting">pokaż listę zapisanych sprawozdań</label>
                    </div>
                    <div class="inputDiv">
                        <input type="radio" id="insertNew" name="insertNewOrOld" value="new">
                        <label for="insertNew">utwórz nowe sprawozdanie</label>
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



