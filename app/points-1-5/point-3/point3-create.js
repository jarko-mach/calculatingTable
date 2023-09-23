"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { point03_TableData } from "./point3-data.js";


export const addPoint3 = () => {

    const contentOfCenterWindow = (selectedNumber) => {
        let localShortName = ""
        let localCode = ""
        point03_TableData[selectedNumber].elements.forEach((elem, index) => {
            localShortName = (elem.shortName) ? `<span class="shortNameColor">${elem.shortName}</span>` : ""
            localCode += `<div class="contentCenter finger" id="element${index}" data-index=${index}><input type="checkbox"><p>${localShortName}${elem.name}</p></div>`
        })
        return localCode
    }

    const selectMainName = (e) => {

        const contentOfRightWindow = (selectedNumber) => {
            let localLeftWindowNumber = document.querySelector(".boxLeft .addedColor").dataset.index
            let localCode = `<div class="contentRight finger" id="description" > ${point03_TableData[Number(localLeftWindowNumber)].elements[selectedNumber].description} </div>`
            return localCode
        }

        const selectName_changeInputSelected_addRemoveFromReport = (evt) => {

            const locIndex = Number(evt.currentTarget.dataset.index)
            newDiv3c.innerHTML = contentOfRightWindow(locIndex)

            const checkBoxState = document.querySelector(`#element${locIndex} input`)
            const locClickedElement = evt.target.tagName
            if (locClickedElement !== 'INPUT') {
                checkBoxState.checked = !checkBoxState.checked
            }

            const localLeftWindowIndex = Number(document.querySelector(".boxLeft .addedColor").dataset.index)
            if (!checkBoxState.checked) {
                const locElements = document.querySelectorAll(".addedItemsContainer .addedItem")
                console.log(localLeftWindowIndex, locIndex)
                locElements.forEach((element, index) => {
                    if (localLeftWindowIndex === Number(element.dataset.indexLeft) && locIndex === Number(element.dataset.indexCenter)) {
                        element.remove()
                    }
                })
                if (!document.querySelector(".addedItemsContainer .addedItem")) {
                    console.log("brak wpisów ")
                }
            }
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
                        identicalElementFound = true
                    }
                })
                return identicalElementFound
            }

            const localLeftWindowNumber = Number(document.querySelector(".boxLeft .addedColor").dataset.index)
            const localCenterWindowNumber = Number(e.currentTarget.dataset.index)

            if (!checkExistingAddedItems(localLeftWindowNumber, localCenterWindowNumber)) {
                const locElement = document.querySelector(".addedItemsContainer")
                const locWasHtml = locElement.innerHTML
                let locIsHtml = ""
                locIsHtml = `<p class="addedItem" data-index-left=${localLeftWindowNumber} data-index-center=${localCenterWindowNumber}><input type="checkbox"><span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].name}</span><descr>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].description}</descr></p>`
                locElement.innerHTML = `${locWasHtml}${locIsHtml}`
            }

            const addedItems_inputBox_Clicked = (event) => {
                // console.log("kliknięto :)", event.target.checked)

                const locCheckedElements = document.querySelectorAll(".addedItemsContainer .addedItem input")
                let isAnythingChecked = false
                locCheckedElements.forEach(elmnt => {
                    if (elmnt.checked === true) isAnythingChecked = true
                })

                const foundButtons = document.querySelectorAll(".point3 button")
                if (event.target.checked) {
                    foundButtons.forEach(element => element.disabled = false)
                } else {
                    if (isAnythingChecked === false) foundButtons.forEach(element => element.disabled = true)
                }
            }

            const locAllElements = document.querySelectorAll(".addedItemsContainer .addedItem input")
            locAllElements.forEach((element, index) => {
                element.addEventListener("click", addedItems_inputBox_Clicked)
            })
        }

        const locString = e.target.dataset.index
        newDiv3c.innerHTML = ""
        newDiv3b.innerHTML = contentOfCenterWindow(Number(locString))

        const listElements = document.querySelectorAll(".point3 .contentCenter")
        listElements.forEach((eleme, index) => {
            eleme.addEventListener("click", addToReport)
            eleme.addEventListener("click", selectName_changeInputSelected_addRemoveFromReport)
            eleme.addEventListener("mouseout", name_UnBold)
            eleme.addEventListener("mouseover", name_Bold)
        })
        document.getElementById(`point3`).scrollIntoView()
    }

    const mainName_Bold = (evt) => { evt.target.classList.add("bolded") }

    const mainName_UnBold = (e) => {
        const locElement = document.querySelector(".boxLeft .bolded")
        if (locElement) { locElement.classList.remove("bolded") }
    }

    const mainName_Color = (e) => { e.target.classList.add("addedColor") }

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

    const textElement = document.createElement("p")
    textElement.classList.add("inform")
    textElement.innerHTML += `<b>&nbsp3.3.&nbsp</b>Dodajemy i usuwamy elementy z raportu korzystając z możliwości zaznaczania i odznaczania w środkowym oknie. W przypadku dolnego okna po zaznaczeniu pozycji uaktywnią się dwa przyciski poniżej.`
    foundPoint3.appendChild(textElement)

    const newAddedContainer = document.createElement("div")
    newAddedContainer.classList.add("addedItemsContainer")
    foundPoint3.appendChild(newAddedContainer)
    newAddedContainer.classList.add("partOfReport")

    const newDivButtons = document.createElement("div")
    newDivButtons.classList.add("buttons")
    foundPoint3.appendChild(newDivButtons)

    const button_removeDescription = () => {
        // console.log("usuwam opis")
        const locAddedElements = document.querySelectorAll(".addedItemsContainer .addedItem input")
        locAddedElements.forEach(elmnt => {
            if (elmnt.checked === true) {
                elmnt.nextSibling.nextSibling?.remove()
                elmnt.checked = false
            }
        })
        buttonElement1.disabled = true
        buttonElement2.disabled = true
    }

    const button_removePoint = () => {

        const selected_leftWindow_Index = Number(document.querySelector(".point3 .addedColor").dataset.index)
        // console.log("left selected:", selected_leftWindow_Index)

        const addedInputs = document.querySelectorAll(".addedItemsContainer .addedItem input:checked")
        addedInputs.forEach(elmnt => {
            elmnt.parentElement.remove()

            const readed_LeftWindow_Index = Number(elmnt.parentElement.dataset.indexLeft)
            const readed_CenterWindow_Index = Number(elmnt.parentElement.dataset.indexCenter)
            // console.log("selected index: left", selected_leftWindow_Index)
            // console.log("readed index: left", readed_LeftWindow_Index,"center", readed_CenterWindow_Index)

            if (selected_leftWindow_Index === readed_LeftWindow_Index) {
                // console.log("cza usunąć checked z checkboxa")

                const centerWindow_selectedCheckBoxes = document.querySelectorAll(".point3 .boxCenter input")
                centerWindow_selectedCheckBoxes.forEach((element, index) => {
                    // console.log(index, element)
                    if (index === readed_CenterWindow_Index) {
                        element.checked = false
                        console.log("trafiony index", index)
                    }
                })
            }

        })
        buttonElement1.disabled = true
        buttonElement2.disabled = true
    }

    const buttonElement1 = document.createElement("button")
    buttonElement1.textContent = "Zaznaczone elementy - usuń tylko opis"
    buttonElement1.disabled = true
    newDivButtons.appendChild(buttonElement1)
    buttonElement1.addEventListener("click", button_removeDescription)

    const buttonElement2 = document.createElement("button")
    buttonElement2.textContent = "Zaznaczone elementy - usuń cały punkt"
    buttonElement2.disabled = true
    newDivButtons.appendChild(buttonElement2)
    buttonElement2.addEventListener("click", button_removePoint)

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

    // const button_addToReport = () => {
    //     alert("Dodajemy wybrane elementy do raportu")
    // }

    // const buttonElement3 = document.createElement("button")
    // buttonElement3.textContent = "Dodaj widoczne elementy do raportu"
    // foundPoint3.appendChild(buttonElement3)
    // buttonElement3.addEventListener("click", button_addToReport)

}
