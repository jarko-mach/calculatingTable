"use strict"

import { tempInformations } from "../miscellaneous/misc.js"

export const removeAllAddedPointsInHtml = () => {
    for (let index = 1; index < tempInformations.length; index++) {
        const foundElement = document.querySelector(`.point${index}`)
        // console.log("mam punkt", index)
        if (foundElement) {
            foundElement.remove()
            // console.log("usuwam wcześniejszy HTML punkt", index, foundElement)
        }
    }
}