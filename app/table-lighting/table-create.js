"use strict";

import { tableAddNumbers } from "./table-operations.js";

import {
    tableMenu_createButtons,
    tableMenu_createCheckboxes
    // tableMenu_checkboxShowHideAllDescriptions
} from "./table-menu.js";

// import { setButtonsEnabledDisabled } from "../menu-btn-check.js";

export const createNewStandardTable = (numberOfCreatingTable) => {
    const foundElement = document.querySelector(".point5")
    // console.log("foundElement2", foundElement)

    const newDiv = document.createElement("div")
    newDiv.classList.add("tableAndMenu")
    newDiv.innerHTML = `
        <div class="menu">
        <div class="menuElements">
            <div class="menuButtons"></div>
            <div class="menuDescriptions"></div>
            <div class="menuCheckboxes"></div>
            <div class="menuCheckboxesDescriptions"></div>
        </div>
        </div>
        <div class="table">
            <table id = "tabela${numberOfCreatingTable}">
                <thead>
                    <tr class="nocolor">
                        <td rowspan="2">Lp.</td>
                        <td rowspan="2">Miejsce pomiarów<br> <small>(według
                                schematu)</small></td>
                        <td rowspan="2">Zmierzone natężenie oświetlenia
                            elektrycznego
                            <br><i>E</i> [lx]
                        </td>
                        <td colspan="2">Eksploatacyjne natężenie oświetlenia elektrycznego
                            <br><i>
                                <upperLine>E</upperLine><sub>m</sub>
                            </i> [lx]
                        </td>
                        <td colspan="2">Równomierność oświetlenia
                            elektrycznego<br><i>U<sub>o</sub></i></td>
                        <td rowspan="2">&nbsp Zgodność z PN</td>
                        </tr>
                        <tr class="nocolor">
                        <td>z pomiarów</td>
                        <td>wg normy</td>
                        <td>z pomiarów</td>
                        <td>wg normy</td>
                    </tr>
                    <tr class="showNumbers">
                    </tr>
                    </thead>
                    <tbody>
                </tbody>
                </table>
                <div class="menuButtonsInLine"></div>
                </div>  
                `

    foundElement.appendChild(newDiv)

    tableAddNumbers()
    tableMenu_createButtons()
    tableMenu_createCheckboxes()
    // tableMenu_checkboxShowHideAllDescriptions()
}