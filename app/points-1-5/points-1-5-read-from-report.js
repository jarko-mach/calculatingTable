
import { tempInformations, loremIpsum } from "../miscellaneous/misc.js"
import { removeAllAddedPointsInHtml } from "./points-1-5-remove.js"
import { addPoint1_subpoints123 } from "./point-1/point1-create.js"
import { findPreviousDiv } from "./points-1-5-create.js"
import { createStandardTable_5a } from "./point-5/table5a-lighting/table5a-createTable.js"
import { readDataForTable_5a } from "./point-5/table5a-lighting/table5a-read-from-storage.js"
import { addPoint2 } from "./point-2/point2-create.js"

export const readDivPoints = (number) => {

    console.log("READ DivPoints = (number) => ", number)

    const foundElement = document.querySelector(findPreviousDiv(number))
    // const foundElement = document.querySelector(".entry")
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
            // dialogBox_createPoint5_selectTableType()
            createStandardTable_5a(tempInformations[number].tableName)
            readDataForTable_5a()
            break;
        default:
            console.log(`Sorry, we are out of ${number}.`);
    }

    document.getElementById(`point${number}`).scrollIntoView()
}


export const readAndDisplayAllAdedPoints = (reportName) => {
    removeAllAddedPointsInHtml()
    for (let index = tempInformations.length - 1; index > 0; index--) {
        if (tempInformations[index].created) {
            readDivPoints(index)
        }
    }
}