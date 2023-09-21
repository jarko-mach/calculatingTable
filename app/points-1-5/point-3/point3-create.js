"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { point03_TableData } from "./point3-data.js";


export const addPoint3 = () => {

    const contentOfCenterWindow = (selectedNumber) => {
        let localShortName = ""
        let localCode = ""
        point03_TableData[selectedNumber].elements.forEach((elem, index) => {
            localShortName = (elem.shortName) ? `<span class="shortNameColor">${elem.shortName}</span>` : ""
            localCode += `<div class="contentCenter finger" id="element${index}" data-index=${index}><input type="checkbox">${localShortName}${elem.name}</div>`
        })
        return localCode
    }

    const selectMainName = (e) => {

        const contentOfRightWindow = (selectedNumber) => {
            let localLeftWindowNumber = document.querySelector(".boxLeft .addedColor").dataset.index
            let localCode = `<div class="contentRight finger" id="description" > ${point03_TableData[Number(localLeftWindowNumber)].elements[selectedNumber].description} </div>`
            return localCode
        }

        const selectName = (evt) => {
            const locString = evt.currentTarget.dataset.index
            newDiv3c.innerHTML = contentOfRightWindow(Number(locString))
        }

        const name_Bold = (evt) => {
            evt.currentTarget.classList.add("bolded")
            const locString = evt.currentTarget.dataset.index
            newDiv3c.innerHTML = contentOfRightWindow(Number(locString))
        }

        const name_UnBold = (evt) => {
            const locElement = document.querySelector(".boxCenter .bolded")
            if (locElement) { locElement.classList.remove("bolded") }
        }

        const addToReport = (e) => {

            const checkExistingAddedItems = (leftColumnNumber, centerColumnNumber) => {
                let identicalElementFound = false
                const addedItems = document.querySelectorAll(".addedItemsContainer .addedItem")
                addedItems.forEach((element, index) => {
                    if ((Number(element.dataset.indexLeft) === leftColumnNumber) && (Number(element.dataset.indexCenter) === centerColumnNumber)) {
                        // console.log("trafiono", element.dataset.indexLeft, element.dataset.indexCenter)
                        identicalElementFound = true
                    }
                })
                return identicalElementFound
            }

            const localLeftWindowNumber = Number(document.querySelector(".boxLeft .addedColor").dataset.index)
            const localCenterWindowNumber = Number(e.currentTarget.dataset.index)
            // console.log("sprawdzam, czy mamy już", localLeftWindowNumber, localCenterWindowNumber)
            if (!checkExistingAddedItems(localLeftWindowNumber, localCenterWindowNumber)) {
                const locElement = document.querySelector(".addedItemsContainer")
                const locWasHtml = locElement.innerHTML
                let locIsHtml = ""

                if (window.confirm("Dołączyć również opis do raportu?")) {
                    console.log("dopisać")
                    locIsHtml = `<p class="addedItem" data-index-left=${localLeftWindowNumber} data-index-center=${localCenterWindowNumber}><input type="checkbox"><span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].name}</span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].description}</p>`
                } else {
                    console.log("raczej nie")
                    locIsHtml = `<p class="addedItem" data-index-left=${localLeftWindowNumber} data-index-center=${localCenterWindowNumber}><input type="checkbox"><span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].name}</span></p>`
                }

                // const locIsHtml = `<p class="addedItem" data-index-left=${localLeftWindowNumber} data-index-center=${localCenterWindowNumber}><input type="checkbox"><span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].name}</span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].description}</p>`
                locElement.innerHTML = `${locWasHtml}${locIsHtml}`
            }
        }

        const name_UnColor = (e) => {
            const locElement = document.querySelector(".boxCenter .addedColor")
            if (locElement) { locElement.classList.remove("addedColor") }
        }

        const locString = e.target.dataset.index
        newDiv3c.innerHTML = ""
        newDiv3b.innerHTML = contentOfCenterWindow(Number(locString))

        const listElements = document.querySelectorAll(".point3 .contentCenter")
        listElements.forEach((eleme, index) => {
            // eleme.addEventListener("click", name_UnColor)
            eleme.addEventListener("click", addToReport)
            eleme.addEventListener("click", selectName)
            eleme.addEventListener("mouseout", name_UnBold)
            eleme.addEventListener("mouseover", name_Bold)
        })
        document.getElementById(`point3`).scrollIntoView()
    }

    const mainName_Bold = (evt) => {
        evt.target.classList.add("bolded")
        // console.log("BOLD evt.target", evt.target)
    }

    const mainName_UnBold = (e) => {
        const locElement = document.querySelector(".boxLeft .bolded")
        if (locElement) { locElement.classList.remove("bolded") }
    }

    const mainName_Color = (e) => {
        e.target.classList.add("addedColor")
    }

    const mainName_UnColor = (e) => {
        const locElement = document.querySelector(".point3 .addedColor")
        if (locElement) { locElement.classList.remove("addedColor") }
    }

    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("pkt3 dataReport", dataReport)
    // dialogBox_chooseMethods()
    const foundPoint3 = document.querySelector(".point3")
    const newContainer = document.createElement("div")
    newContainer.classList.add("container")
    foundPoint3.appendChild(newContainer)

    const newAddedContainer = document.createElement("div")
    newAddedContainer.classList.add("addedItemsContainer")
    foundPoint3.appendChild(newAddedContainer)
    newAddedContainer.classList.add("partOfReport")

    const newDiv3a = document.createElement("div")
    newDiv3a.classList.add("boxLeft")
    point03_TableData.forEach((element, index) => {
        newDiv3a.innerHTML += `<div class="contentLeft finger" id="mainName${index}" data-index="${index}"> ${element.mainName} </div>`
    })
    newDiv3a.innerHTML += `</div">`
    newContainer.appendChild(newDiv3a)

    const listElements = document.querySelectorAll(".point3 .contentLeft")
    listElements.forEach((eleme, index) => {
        eleme.addEventListener("click", selectMainName)
        eleme.addEventListener("click", mainName_UnColor)
        eleme.addEventListener("click", mainName_Color)
        eleme.addEventListener("mouseout", mainName_UnBold)
        eleme.addEventListener("mouseover", mainName_Bold)
    })

    const newDiv3b = document.createElement("div")
    newContainer.appendChild(newDiv3b)
    newDiv3b.classList.add("boxCenter")

    const newDiv3c = document.createElement("div")
    newContainer.appendChild(newDiv3c)
    newDiv3c.classList.add("boxRight")

}

