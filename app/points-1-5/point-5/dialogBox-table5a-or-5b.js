

import { createStandardTable_5a } from "./table5a-lighting/table5a-createTable.js"
import { remove_Point5_html } from "../../points-1-5/point-5/point-5-remove.js"

////// ADD TABLE INTO POINT 5  -------------------------------------------------------------------------------

export const dialogBox_createPoint5_selectTableType = () => {
    let whatNext = ""
    console.log("createPoint5...")

    const getOKButton = () => {
        console.log("kliknięto OK")
        const radioGroupStandardOrRescue = document.querySelectorAll("input[name=selectStandardOrRescue]")
        for (const radio1 of radioGroupStandardOrRescue) {
            if (radio1.checked) {
                whatNext = radio1.value;
                break;
            }
        }
        document.querySelector(".openDialogBox").innerHTML = ``
        if (whatNext === "standard") createStandardTable_5a("new")
        if (whatNext === "rescue") {
            alert("Na razie nie ma tej tabeli w opcjach programu...")
            remove_Point5_html()
        }
    }

    const getCancelButton = () => {
        console.log("kliknięto cancel")
        const foundElement = document.querySelector(".openDialogBox");
        foundElement.innerHTML = ``;
        remove_Point5_html()
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    newElement.innerHTML =
        ` 
        <div class="dialogBox">
            <div class="dialogBoxHeader wider400"> Wybierz rodzaj tabeli
            </div>
            <div class="dialogBoxChild wider400">
                <fieldset class="fieldsetWidth wider200">
                    <legend>Utwórz / wstaw:</legend>
                    <div class="inputDiv">
                        <input type="radio" id="insertStandard" name="selectStandardOrRescue" value="standard" checked>
                        <label for="insertStandard">tabelę badania oświetlenia elektrycznego</label>
                    </div>
                    <div class="inputDiv">
                        <input type="radio" id="insertRescue" name="selectStandardOrRescue" value="rescue">
                        <label for="insertRescue">tabelę badania oświetlenia awaryjnego ewakuacyjnego</label>
                    </div>
                </fieldset>
                <div class="btnLayout wider200">
                    <button class="okSave">Dalej</button>
                    <button class="noCancel">Anuluj</button>
                </div>
            </div>
        </div>  
      `

    foundElement.append(newElement)
    // console.log("utworzono header tabeli")
    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
    // console.log("podpięto eventy")
}
