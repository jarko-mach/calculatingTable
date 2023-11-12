"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { transformString_JsonToHtml } from "./point3-data-operations.js";

export const read_point3 = () => {
    // console.log("3 - odczytujemy...")
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("pkt3 dataReport", dataReport)

    const foundPoint3 = document.querySelector(".point3")
    const newDiv3 = document.createElement("div")
    newDiv3.classList.add("partOfReport")
    newDiv3.classList.add("points_1_2_3_4_5_MarginBottom")
    foundPoint3.appendChild(newDiv3)

    newDiv3.innerHTML = ""
    dataReport.point3.elements.forEach((eleme, index) => {
        newDiv3.innerHTML += (eleme.description) ? `<div class="addedElement"><input type="text" class="point3input1" value="${eleme.name}"><textarea class="point3input2" rows="${Math.round(eleme.description.length / 84)}">${eleme.description}</textarea></div>` : `<div class="addedElement"><input type="text" class="point3input1" value="${eleme.name}"></div>`
        // console.log(index, eleme.description)
    })
}
