"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";


export const read_point3 = () => {
    // console.log("3 - odczytujemy...")
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("pkt3 dataReport", dataReport)

    const foundPoint3 = document.querySelector(".point3")
    const newDiv3 = document.createElement("div")
    newDiv3.classList.add("partOfReport")
    foundPoint3.appendChild(newDiv3)

    newDiv3.innerHTML = ""
    dataReport.point3.elements.forEach((eleme, index) => {
        newDiv3.innerHTML += `<div class="addedElement"><input type="text" class="point3input1" value="${eleme.name}"><textarea class="point3input2" rows="${Math.round(eleme.description.length / 84)}">${eleme.description}</textarea></div>`

    })
}
