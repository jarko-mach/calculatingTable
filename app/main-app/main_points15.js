"use strict"

import { saveReportAndTable } from "./app.js";
import { dialogBox_point5_selectTableType } from "./main-dialog-boxes.js"
import { readTable_5a } from "../table5a-lighting/table5a-operations.js"
import { createStandardTable_5a } from "../table5a-lighting/table5a-create.js"
import { tempInformations } from "../miscellaneous/misc.js"

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ante eu urna vestibulum accumsan. Nulla facilisi. Sed consequat quam sem, ac gravida libero dictum a. Donec mollis velit scelerisque erat iaculis commodo. Maecenas interdum neque vel dui"

export const removeAllAddedPointsInHtml = () => {
    for (let index = 1; index < tempInformations.length; index++) {
        const foundElement = document.querySelector(`.point${index}`)
        // console.log("mam punkt", index)
        if (foundElement) {
            foundElement.remove()
            console.log("usuwam wcześniejszy HTML punkt", index, foundElement)
        }
    }
}

export const readAndDisplayAllAdedPoints = (reportName) => {

    removeAllAddedPointsInHtml()
    for (let index = 1; index < tempInformations.length; index++) {
        // console.log("2 - mam punkt", index)
        if (tempInformations[index].created) {
            // console.log("dodaję punkt", index)
            tempInformations[index].created = false
            createDivPoints(index)
            // ------------------------
            if (index === 5) {
                createStandardTable_5a(tempInformations[index].tableName)
                // debugger

                readTable_5a()
                // ------------------------
            }
        }
    }
}

const findPreviousDiv = (number) => {
    for (let index = number - 1; index > 0; index--) {
        const foundElement = document.querySelector(`.point${index}`)
        if (foundElement) {
            return `.point${index}`
        }
    }
    return ".entry"
}

const createDivPoints = (number) => {
    if (tempInformations[number].created === false) {
        tempInformations[number].created = true
        const foundElement = document.querySelector(findPreviousDiv(number))
        const newDiv = document.createElement("div")
        newDiv.classList.add(`point${number}`)

        let mainText = ""
        switch (number) {
            case 1:
                mainText = `1. PODSTAWA WYKONANIA BADAŃ`
                break;
            case 2:
                mainText = `2. CEL BADAŃ`
                break;
            case 3:
                mainText = `3. METODYKA BADAŃ`
                break;
            case 4:
                mainText = `4. MIEJSCE I OKOLICZNOŚCI BADAŃ`
                break;
            case 5:
                mainText = `5. ZESTAWIENIE BADAŃ`
                break;
            default:
                console.log(`Sorry, we are out of ${number}.`);
        }

        newDiv.innerHTML =
            `
                <p class="reportSubtitle">
                    <a id="point${number}"> <br> ${mainText} <br> </a>
                    <p style="color:darkgray;font-size:12px;">${loremIpsum}</p>
                </p>`
        foundElement.after(newDiv)
    }
    document.getElementById(`point${number}`).scrollIntoView()
}

export const addPoint_1 = () => {
    createDivPoints(1)
    saveReportAndTable()
}

export const addPoint_2 = () => {
    createDivPoints(2)
    saveReportAndTable()
}
export const addPoint_3 = () => {
    createDivPoints(3)
    saveReportAndTable()
}
export const addPoint_4 = () => {
    createDivPoints(4)
    saveReportAndTable()
}

export const addPoint_5 = () => {
    createDivPoints(5)
    if (tempInformations[5].created === false) dialogBox_point5_selectTableType()
}
