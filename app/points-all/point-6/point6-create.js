"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";

export const addPoint6 = () => {

    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    
    const foundPoint6 = document.querySelector(".point6")
    const newDiv = document.createElement("div")
    newDiv.classList.add("points_all_MarginBottom")
    newDiv.innerHTML = (!dataReport.point6.created) ?
        `<div class="point1_1"><textarea id="point6Text" rows="2" class="partOfReport">Można wpisać cokolwiek...</textarea></div>`
        : `<div class="point1_1"><textarea id="point6Text" rows="2" class="partOfReport">${dataReport.point6.text6}</textarea></div>`
    foundPoint6.appendChild(newDiv)
}