"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";

export const addPoint4 = () => {
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    const foundPoint4 = document.querySelector(".point4")
    let foundResearchAddress
    const newDiv4 = document.createElement("div")
    newDiv4.classList.add("points_all_MarginBottom")
    
    if (!dataReport.point4.created) {
        foundResearchAddress = document.querySelector(".entry #researchAddress").value
        // console.log("foundResearchAddress", foundResearchAddress)
    }
    newDiv4.innerHTML = (!dataReport.point4.created) ?
        `<div class="point1_1"><textarea id="point4Text" rows="2" class="partOfReport">${foundResearchAddress}\nMożna wpisać cokolwiek...</textarea></div>`
        : `<div class="point1_1"><textarea id="point4Text" rows="2" class="partOfReport">${dataReport.point4.text4}</textarea></div>`
    foundPoint4.appendChild(newDiv4)
}
