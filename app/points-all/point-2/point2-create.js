"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { fixedPointsInfo_tableData } from "../points-all-data.js";

export const addPoint2 = () => {
    let foundResearchAddress = ""
    const foundTitle = document.querySelector(".entry .reportTitle h2").textContent
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("pkt2 dataReport", dataReport)

    if (!dataReport.point2.created) {
        foundResearchAddress = document.querySelector(".entry #researchAddress").value
        // console.log("foundResearchAddress", foundResearchAddress)
    }

    const foundPoint2 = document.querySelector(".point2")
    const newDiv2 = document.createElement("div")
    newDiv2.classList.add("points_all_MarginBottom")

    fixedPointsInfo_tableData.forEach((element, index) => {
        // debugger
        if (element.name === foundTitle) {
            newDiv2.innerHTML = (!dataReport.point2.created) ?
                `<div class="point1_1"><textarea id="point2Text" rows="2" class="partOfReport">${fixedPointsInfo_tableData[index].point2} ${foundResearchAddress}</textarea></div>`
                : `<div class="point1_1"><textarea id="point2Text" rows="2" class="partOfReport">${dataReport.point2.text2}</textarea></div>`
            foundPoint2.appendChild(newDiv2)


        }
    })

}