
import { tempInformations, loremIpsum } from "../miscellaneous/misc.js"
import { removeAllAddedPointsInHtml } from "./points-1-5-remove.js"
import { findPreviousDiv } from "./points-1-5-create.js"
import { addPoint1_subpoints123 } from "./point-1/point1-create.js"
import { addPoint2 } from "./point-2/point2-create.js"
import { read_point3 } from "./point-3/point3-read.js"
import { createStandardTable_5a } from "./point-5/table5a-lighting/table5a-createTable.js"
import { readDataForTable_5a } from "./point-5/table5a-lighting/table5a-read-from-storage.js"
import { saveReportAndTable } from "../main-app/reports/save-report-and-table.js"

export const readDivPoints = (number) => {

    // console.log("READ DivPoints = (number) => ", number)

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
        <a id="point${number}"> <br> ${mainText} <br> </a><button class="butonDel" id="Button${number}">Delete</button>
        </p>`
    if (number === 4) {
        newDiv.innerHTML += `<p style="color:darkgray;font-size:12px;">${loremIpsum}</p>`
    }

    const removePoint = (e) => {
        const myElem = e.target
        // console.log("myElem", myElem.id)
        const myPointNr = myElem.id[6]
        // console.log("mam punkt", myPointNr)
        if (confirm("Nastąpi nieodwracalne usunięcie danego punktu. Kontynuować?")) {
            // console.log("TAK")
            const foundElement = document.querySelector(`.point${myPointNr}`)
            if (foundElement) {
                foundElement.remove()
                tempInformations[Number(myPointNr)].created = false
                // debugger
                saveReportAndTable()
            }
        } else {
            // console.log("NIE")
        }
    }

    foundElement.after(newDiv)
    const findButton = document.querySelector(`#Button${number}`)
    findButton.addEventListener('click', removePoint)

    // debugger
    switch (number) {
        case 1:
            addPoint1_subpoints123()
            break;
        case 2:
            addPoint2()
            break;
        case 3:
            read_point3()
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