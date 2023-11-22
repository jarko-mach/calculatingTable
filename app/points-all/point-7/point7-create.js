"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { law_regulations } from "../point-3/point3-data-law.js";

export const addPoint7 = () => {
    const foundTitle = document.querySelector(".entry .reportTitle h2").textContent
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));

    const foundPoint7 = document.querySelector(".point7")
    const newDiv7 = document.createElement("div")
    newDiv7.classList.add("points_all_MarginBottom")
    let regulations = ""

    law_regulations.forEach((element, index) => {
        if (element.description === foundTitle) {

            element.regulations.forEach(element_regul => {
                regulations += `\n&#9864&nbsp&nbsp${element_regul}\n`
            })
        }
    })

    newDiv7.innerHTML = (!dataReport.point7.created) ?
        `<div class="point1_1"><textarea id="point7Text" rows="${Math.round(regulations.length / 44)}" class="partOfReport">Wyniki badań porównano z wartościami określonymi w przepisach prawnych:\n${regulations}\nMożna dopisać cokolwiek...</textarea></div>`
        : `<div class="point1_1"><textarea id="point7Text" rows="${Math.round(dataReport.point7.text7.length / 44)}" class="partOfReport">${dataReport.point7.text7}</textarea></div>`
    foundPoint7.appendChild(newDiv7)
}