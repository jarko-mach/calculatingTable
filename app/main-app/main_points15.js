"use strict"

import { dialogBox_point5_selectTableType } from "./main-dialog-boxes.js"

export const pointsAddedIntoCurrentReport = [0, 0, 0, 0, 0, 0]

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ante eu urna vestibulum accumsan. Nulla facilisi. Sed consequat quam sem, ac gravida libero dictum a. Donec mollis velit scelerisque erat iaculis commodo. Maecenas interdum neque vel dui"

export const reset_pointsAddedIntoCurrentReport = () => {
    for (let locIndeks = 0; locIndeks < pointsAddedIntoCurrentReport.length; locIndeks++) {
        pointsAddedIntoCurrentReport[locIndeks] = 0
    }
    console.log("reset", pointsAddedIntoCurrentReport)
}

export const removeAllAddedPointsInHtml = () => {
    for (let index = 1; index <= pointsAddedIntoCurrentReport.length; index++) {
        const foundElement = document.querySelector(`.point${index}`)
        console.log("mam punkt", index)
        if (foundElement) {
            foundElement.remove()
            console.log("usuwam punkt", index, foundElement)
        }
    }
}

export const readAndDisplayAllAdedPoints = () => {
    
    removeAllAddedPointsInHtml()
    // debugger
    for (let index = 1; index <= pointsAddedIntoCurrentReport.length; index++) {
        console.log(pointsAddedIntoCurrentReport[index])
        console.log("2 - mam punkt", index)
        if (pointsAddedIntoCurrentReport[index]) {
            console.log("dodaję punkt", index)
            pointsAddedIntoCurrentReport[index] = 0
            createDivPoints(index)
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
    if (pointsAddedIntoCurrentReport[number] === 0) {
        pointsAddedIntoCurrentReport[number] = 1
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
}

export const addPoint_2 = () => {
    createDivPoints(2)
}
export const addPoint_3 = () => {
    createDivPoints(3)
}
export const addPoint_4 = () => {
    createDivPoints(4)
}

export const addPoint_5 = () => {
    createDivPoints(5)
    dialogBox_point5_selectTableType()
}
