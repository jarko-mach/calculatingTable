"use strict"

import { tempInformations, loremIpsum } from "../miscellaneous/misc.js"
import { addPoint1_subpoints123 } from "./point-1/point1-create.js"
import { addPoint2 } from "./point-2/point2-create.js"
import { dialogBox_createPoint5_selectTableType } from "./point-5/dialogBox-table5a-or-5b.js"
import { saveReportAndTable } from "../main-app/reports/save-report-and-table.js"


export const findPreviousDiv = (number) => {
    for (let index = number - 1; index > 0; index--) {
        const foundElement = document.querySelector(`.point${index}`)
        if (foundElement) {
            return `.point${index}`
        }
    }
    return ".entry"
}

const createNewDivPoints = (number) => {

    console.log("create NEW DivPoints = (number) => ", number)

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
            ` <p class="reportSubtitle">
                    <a id="point${number}"> <br> ${mainText} <br> </a>
                </p>`
        if (number !== 1 && number !== 2 && number !== 5) {
            newDiv.innerHTML += `<p style="color:darkgray;font-size:12px;">${loremIpsum}</p>`
        }

        foundElement.after(newDiv)
        // debugger
        switch (number) {
            case 1:
                addPoint1_subpoints123()
                break;
            case 2:
                addPoint2()
                break;
            case 3:

                break;
            case 4:

                break;
            case 5:
                dialogBox_createPoint5_selectTableType()
                // createStandardTable_5a(tempInformations[number].tableName)
                // readDataForTable_5a()
                break;
            default:
                console.log(`Sorry, we are out of ${number}.`);
        }
    }
    document.getElementById(`point${number}`).scrollIntoView()
}

export const addNewPoint_1 = () => {
    createNewDivPoints(1)
    saveReportAndTable()
}

export const addNewPoint_2 = () => {
    createNewDivPoints(2)
    saveReportAndTable()
}
export const addNewPoint_3 = () => {
    createNewDivPoints(3)
    saveReportAndTable()
}
export const addNewPoint_4 = () => {
    createNewDivPoints(4)
    saveReportAndTable()
}

export const addNewPoint_5 = () => {
    createNewDivPoints(5)
    // saveReportAndTable()
}
