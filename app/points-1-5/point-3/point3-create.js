"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { point03_TableData } from "./point-3-data.js";

const readPoint03Data = (numb) => {
    const localTable = []
    point03_TableData[numb].elements.forEach((elem, index) => {
        localTable[index] = elem.name
    })
    return localTable
}


export const addPoint3 = () => {

    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    console.log("pkt3 dataReport", dataReport)
    if (!dataReport.point3.created) {
        // foundResearchAddress = document.querySelector(".entry #researchAddress").value
        console.log("point3 created")
    }

    const foundPoint3 = document.querySelector(".point3")

    const newContainer = document.createElement("div")
    newContainer.classList.add("container")

    foundPoint3.appendChild(newContainer)

    const newDiv3 = document.createElement("div")
    newDiv3.innerHTML = `<div class="point3">`
    point03_TableData.forEach((element, index) => {
        newDiv3.innerHTML += `<div> ${element.mainName} </div>`
    })
    newDiv3.innerHTML += `</div">`
    newContainer.appendChild(newDiv3)

    const newDiv3a = document.createElement("div")
    newDiv3a.innerHTML = `<div>`
    point03_TableData[0].elements.forEach((elem, index) => {
        newDiv3a.innerHTML += `<div> ${elem.name} </div>`
    })
    newDiv3a.innerHTML += `</div">`
    newContainer.appendChild(newDiv3a)
}