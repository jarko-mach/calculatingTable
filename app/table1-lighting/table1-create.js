"use strict";

import { tableAddNumbers } from "./table1-operations.js"

// import { operationIsDone } from "../miscellaneous/misc.js";

import {
    tableMenu_createButtons,
    tableMenu_createCheckboxes,
    tableMenu_ShowHideAllDescriptions
} from "./table1-menu.js"

export const createStandardTable = (tableName) => {
    const foundElement = document.querySelector(".point5")
    // console.log("found", foundElement)
    const newDiv = document.createElement("div")
    newDiv.classList.add(tableName)
    newDiv.classList.add("tableAndMenu")
    newDiv.innerHTML = `
        <div class="menu">
            <div class="menuElements">
                <div class="menuButtons"></div>
                <div class="menuButtonsDescriptions"></div>
                <div class="menuCheckboxes"></div>
                <div class="menuCheckboxesDescriptions"></div>
            </div>
        <div class="confContainerParent">
            <div class="confContainer">
                <div class="confElement"> ZROBIONE </div>
            </div>
        </div>
        </div>
        <div >
            <table class="tableLight" id = "${tableName}">
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
            <div class="menuButtonsInLine">
            </div>
        </div>  `

    foundElement.appendChild(newDiv)

    tableAddNumbers(tableName)
    tableMenu_createButtons(tableName)
    tableMenu_createCheckboxes(tableName)
    tableMenu_ShowHideAllDescriptions(tableName)
}