"use strict";

import { tableAddNumbers } from "./table-operations.js";

import { setButtonsEnabledDisabled } from "../menu-btn-check.js";

export const etap2_addTable = () => {
    const foundElement = document.querySelector(".openDialogBox")
    // console.log("foundElement2", foundElement)
    const newDiv1 = document.createElement("div")
    newDiv1.innerHTML =
        `<p class="table1Text"><br>1. PODSTAWA WYKONANIA BADAŃ<br></p>
        <p class="table1Text"><br>2. CEL BADAŃ<br></p>
        <p class="table1Text"><br>3. METODYKA BADAŃ<br></p>
        <p class="table1Text"><br>4. MIEJSCE I OKOLICZNOŚCI BADAŃ<br></p>
        <p class="table1Text"><br>5. ZESTAWIENIE BADAŃ<br></p>
        <p class="table1Text"><br><br>Tabela nr 1<br></p>
        <p class="badania_E2">Badania oświetlenia elektrycznego</p>
        <table>
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
        <footer class="menu">
            <div class="menuButtons"></div>
            <div class="menuDescriptions"></div>
            <div class="menuCheckboxes"></div>
            <div class="menuCheckboxesDescriptions"></div>
            <div class="info">Wersja 1.4 <i>JM</i></div>
        </footer>`
    foundElement.before(newDiv1)
    tableAddNumbers()
    setButtonsEnabledDisabled("tableNew")
}