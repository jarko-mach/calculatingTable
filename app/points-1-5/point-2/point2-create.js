"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { definitionPurposeOfResearch } from "./point2-data.js";

export const addPoint2 = () => {
    let foundResearchAddress = ""
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("pkt2 dataReport", dataReport)

    if (!dataReport.point2.created) {
        foundResearchAddress = document.querySelector(".entry #researchAddress").value
        // console.log("foundResearchAddress", foundResearchAddress)
    }

    const foundPoint2 = document.querySelector(".point2")
    const newDiv1 = document.createElement("div")
    newDiv1.innerHTML = (!dataReport.point2.created) ?
        `<div class="point1_1"><textarea id="point2Text" rows="2" class="partOfReport">${definitionPurposeOfResearch} ${foundResearchAddress}</textarea></div>`
        : `<div class="point1_1"><textarea id="point2Text" rows="2" class="partOfReport">${dataReport.point2.text2}</textarea></div>`
    foundPoint2.appendChild(newDiv1)
}