"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { point03_TableData } from "./point3-data.js";
import { readAndDisplayAllAdedPoints } from "../points-1-5-read-from-report.js";


export const addPoint3 = () => {

    const contentOfCenterWindow = (selectedNumber) => {

        const checkElementAddedToReport = (leftNumber, centerNumber) => {
            let elementChecked = false
            const addedElements = document.querySelectorAll(".addedItemsContainer .addedItem")
            addedElements.forEach((element, index) => {
                if (Number(element.dataset.indexLeft) === leftNumber && Number(element.dataset.indexCenter) === centerNumber) {
                    elementChecked = true
                }
            })
            return elementChecked
        }

        let localShortName = ""
        let localCode = ""
        let elementChecked = false

        function mySort(a, b) {
            const myA = a.name
            const myB = b.name
            return myA.localeCompare(myB)
        }
        // console.log(point03_TableData[selectedNumber].elements)

        point03_TableData[selectedNumber].elements.sort(mySort)
        // debugger
        let leftNumb = document.querySelector(".boxLeft .bolded").dataset.index
        // console.log("leftNumb", leftNumb)
        // .dataset.index

        point03_TableData[selectedNumber].elements.forEach((elem, index) => {
            if (!point03_TableData[leftNumb].elements[index].displayInOneLine) {
                // console.log("multi")
                elementChecked = checkElementAddedToReport(selectedNumber, index) ? "checked" : ""
                localShortName = (elem.shortName) ? `<span class="shortNameColor">${elem.shortName}</span>` : ""
                localCode += `<div class="centerItem finger" id="element${index}" data-index=${index}><input type="checkbox" ${elementChecked}><p>${localShortName}${elem.name}</p></div>`
            } else {
                elementChecked = checkElementAddedToReport(selectedNumber, index) ? "checked" : ""
                let buttonDisabled = (Boolean(elementChecked)) ? "" : `disabled="true"`
                // console.log("akapit", buttonDisabled)
                localCode += `<div class="centerItem finger" id="element${index}" data-index=${index}><input type="checkbox" ${elementChecked}><p>${localShortName}${elem.name}</p><div><button id="button${index}" ${buttonDisabled}">Edytuj</button></div></div>`
            }
        })

        return localCode
    }

    const selectMainName = (e) => {

        const contentOfRightWindow = (selectedNumber) => {
            let localLeftWindowNumber = document.querySelector(".boxLeft .addedColor").dataset.index
            let localCode = `<div class="contentRight finger" id="description" > ${point03_TableData[Number(localLeftWindowNumber)].elements[selectedNumber].description} </div>`
            return localCode
        }

        const name_Bold = (evt) => {
            evt.currentTarget.classList.add("bolded")
            const centerNumber = Number(evt.currentTarget.dataset.index)
            newDiv3c.innerHTML = contentOfRightWindow(centerNumber)
        }

        const name_UnBold = (evt) => {
            const locElement = document.querySelector(".boxCenter .bolded")
            if (locElement) { locElement.classList.remove("bolded") }
        }

        const addToPoint_removeFromPoint_3_3 = (e) => {

            // console.log("./././.")

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

            const checkBoxState = document.querySelector(`#element${localCenterWindowNumber} input`)
            const locClickedElement = e.target.tagName
            if (locClickedElement !== 'INPUT') {
                checkBoxState.checked = !checkBoxState.checked
            }

            if (point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber]?.displayInOneLine) {
                let localButton = document.querySelector(`#button${localCenterWindowNumber}`)
                if (checkBoxState.checked === true) {
                    localButton.disabled = false
                } else {
                    localButton.disabled = true
                    newDiv3b_extra.classList.remove("boxCenter_extra")
                    newDiv3b_extra.innerHTML = ""
                }
            }
            // debugger
            if (!checkExistingAddedItems(localLeftWindowNumber, localCenterWindowNumber)) {
                let locElement = document.querySelector(".addedItemsContainer")
                let locWasHtml = locElement.innerHTML
                let locIsHtml = ""
                locIsHtml = `<div class="addedItem" data-index-left=${localLeftWindowNumber} data-index-center=${localCenterWindowNumber}><input type="checkbox"><span>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].name}</span><descr>${point03_TableData[localLeftWindowNumber].elements[localCenterWindowNumber].description}</descr></div>`
                locElement.innerHTML = `${locWasHtml}${locIsHtml}`
                buttonAddToReport.disabled = (document.querySelectorAll(".addedItemsContainer .addedItem").length) ? false : true
            } else {
                const locElements = document.querySelectorAll(".addedItemsContainer .addedItem")
                // console.log(localLeftWindowIndex, locIndex)
                locElements.forEach((element, index) => {
                    if (localLeftWindowNumber === Number(element.dataset.indexLeft) && localCenterWindowNumber === Number(element.dataset.indexCenter)) {
                        element.remove()
                    }
                })
                if (!document.querySelector(".addedItemsContainer .addedItem")) {
                    // console.log("brak wpisów ")
                    buttonAddToReport.disabled = (document.querySelectorAll(".addedItemsContainer .addedItem").length) ? false : true
                }
            }

            const addedItems_inputBox_Clicked = (event) => {
                // console.log("kliknięto :)", event.target.checked)

                const locCheckedElements = document.querySelectorAll(".addedItemsContainer .addedItem input")
                let isAnythingChecked = false
                locCheckedElements.forEach(elmnt => {
                    if (elmnt.checked === true) isAnythingChecked = true
                })

                const foundButtons = document.querySelectorAll(".point3 .buttonDelete button")
                if (event.target.checked) {
                    foundButtons.forEach(element => element.disabled = false)
                } else {
                    if (isAnythingChecked === false) foundButtons.forEach(element => element.disabled = true)
                }
            }
            // debugger
            const locAllElements = document.querySelectorAll(".addedItemsContainer .addedItem input")
            locAllElements.forEach((element, index) => {
                element.addEventListener("click", addedItems_inputBox_Clicked)
            })

            buttonRemove.disabled = (document.querySelectorAll(".addedItemsContainer .addedItem input:checked").length) ? false : true
        }

        const indexNumber = e.target.dataset.index
        newDiv3c.innerHTML = ""
        newDiv3b.innerHTML = contentOfCenterWindow(Number(indexNumber))
        newDiv3b_extra.innerHTML = ""
        newDiv3b_extra.classList.remove("boxCenter_extra")

        const listElements = document.querySelectorAll(".point3 .centerItem")
        listElements.forEach((eleme, index) => {
            eleme.addEventListener("click", addToPoint_removeFromPoint_3_3)
            eleme.addEventListener("mouseout", name_UnBold)
            eleme.addEventListener("mouseover", name_Bold)
        })


        const show_hideColumnExtra = (e) => {

            e.stopPropagation()

            const leftWindowNumber = Number(document.querySelector(".boxLeft .addedColor").dataset.index)
            const centerWindowNumber = Number(e.currentTarget.closest(".centerItem").dataset.index)

            if (e.srcElement.textContent === "Edytuj") {
                newDiv3b_extra.classList.add("boxCenter_extra")

                point03_TableData[leftWindowNumber].elements[centerWindowNumber].elementsOneLine.sort()

                const tableSpanLine = []
                tableSpanLine.length = point03_TableData[leftWindowNumber].elements[centerWindowNumber].elementsOneLine.length
                tableSpanLine.fill(false)

                const addedElements = document.querySelectorAll(".addedItemsContainer .addedItem span .line")
                addedElements.forEach((element, index) => {

                    if (Number(element.closest(".addedItem").dataset.indexLeft) === leftWindowNumber && Number(element.closest(".addedItem").dataset.indexCenter) === centerWindowNumber) {
                        tableSpanLine[Number(element.dataset.indexExtra)] = true
                    }
                })
                // console.log("addedElements", addedElements, tableSpanLine)

                point03_TableData[leftWindowNumber].elements[centerWindowNumber].elementsOneLine.forEach((element, index) => {
                    let inputChecked = tableSpanLine[index] ? " checked " : ""
                    newDiv3b_extra.innerHTML += `<div class="centerItem_extra finger" id="name_extra${index}" data-index="${index}"><input type="checkbox"${inputChecked}><p>${element}</p></div>`
                })

                const clickedCenter_extra = (evt) => {
                    const checkBoxState = document.querySelector(`#name_extra${Number(evt.currentTarget.dataset.index)} input`)
                    // console.log("1", evt.currentTarget, "2", checkBoxState.checked)
                    const locClickedElement = evt.target.tagName
                    // console.log(locClickedElement)
                    if (locClickedElement !== 'INPUT') { checkBoxState.checked = !checkBoxState.checked }
                }

                const table2b = document.querySelectorAll('.point3 .centerItem_extra')
                table2b.forEach((element, index) => {
                    element.addEventListener('click', clickedCenter_extra)
                })
                e.srcElement.textContent = "Dopisz"
            } else {
                // console.log("ukrywam")
                let htmlExchange = ""
                let addComa = ", "
                const checkedElements = document.querySelectorAll(`.centerItem_extra input:checked`)
                if (checkedElements.length > 0) {
                    checkedElements.forEach((element, index) => {
                        // console.log(element.parentElement.dataset.index, element.nextElementSibling.textContent, checkBoxState.checked)
                        if (checkedElements.length - 1 === index) { addComa = "" }
                        htmlExchange += `<p class="line" data-index-extra="${element.parentElement.dataset.index}">${element.nextElementSibling.textContent}${addComa}</p>`
                    }
                    )
                }
                let wasElements = document.querySelectorAll(".point3 .addedItemsContainer .addedItem")
                // console.log("wasElement", wasElements)
                wasElements.forEach((element, index) => {
                    // console.log("mam", index, element)
                    if (Number(element.dataset.indexLeft) === leftWindowNumber && Number(element.dataset.indexCenter) === centerWindowNumber) {
                        // console.log("=", element.firstElementChild.nextSibling.innerHTML)
                        element.firstElementChild.nextSibling.innerHTML = htmlExchange

                    }
                })

                newDiv3b_extra.innerHTML = "";
                newDiv3b_extra.classList.remove("boxCenter_extra")
                e.srcElement.textContent = "Edytuj"
            }
        }

        listElements.forEach((eleme, index) => {
            if (eleme.innerHTML.indexOf("button") !== -1) {
                let localButton = document.querySelector(`#button${index}`)
                localButton.addEventListener("click", show_hideColumnExtra)
            }
        })
    }


    document.getElementById(`point3`).scrollIntoView()


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

    const foundPoint3 = document.querySelector(".point3")
    const newContainer = document.createElement("div")
    newContainer.classList.add("container")
    foundPoint3.appendChild(newContainer)

    const textElement = document.createElement("p")
    textElement.classList.add("inform")
    textElement.innerHTML += `<b>&nbsp3.3.&nbsp</b>Dodajemy i usuwamy elementy z raportu korzystając z możliwości zaznaczania i odznaczania w środkowym oknie. W przypadku dolnego okna po zaznaczeniu pozycji uaktywni się przycisk poniżej.`
    foundPoint3.appendChild(textElement)

    const newAddedContainer = document.createElement("div")
    newAddedContainer.classList.add("addedItemsContainer")
    foundPoint3.appendChild(newAddedContainer)
    newAddedContainer.classList.add("partOfReport")

    const newDivButtons = document.createElement("div")
    newDivButtons.classList.add("buttonDelete")
    foundPoint3.appendChild(newDivButtons)

    const textElement2 = document.createElement("p")
    textElement2.classList.add("inform")
    textElement2.innerHTML += `<b>&nbsp3.4.&nbsp</b>Po ustaleniu wszystkich elementów klawiszem "Dodaj do raportu" dopisujemy wybrane do raportu.`
    foundPoint3.appendChild(textElement2)

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
                        // console.log("trafiony index", index)
                    }
                })
            }

        })
        buttonRemove.disabled = true
        buttonAddToReport.disabled = (document.querySelectorAll(".addedItemsContainer .addedItem").length) ? false : true
    }

    const buttonRemove = document.createElement("button")
    buttonRemove.textContent = "Zaznaczone elementy - usuń"
    buttonRemove.disabled = true
    buttonRemove.classList.add("buttonPt3")
    newDivButtons.appendChild(buttonRemove)
    buttonRemove.addEventListener("click", button_removePoint)

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

    const newDiv3b_extra = document.createElement("div")
    newContainer.appendChild(newDiv3b_extra)
    // newDiv3b_extra.classList.add("boxCenter_extra")
    // newDiv3b_extra.classList.add("noDisplay")

    const newDiv3c = document.createElement("div")
    newContainer.appendChild(newDiv3c)
    newDiv3c.classList.add("boxRight")

    const button_addToReport = () => {
        // alert("Dodajemy wybrane elementy do raportu")
        const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
        // debugger
        const locElementts = document.querySelectorAll(".addedItemsContainer .addedItem")
        locElementts.forEach((elem, indx) => {
            dataReport.point3.elements.push({ name: elem.firstElementChild.nextElementSibling?.textContent, description: elem.firstElementChild.nextElementSibling.nextElementSibling?.textContent })
            // console.log("items", indx, elem, dataReport, readTemporaryReportName())
        })
        localStorage.setItem(`${readTemporaryReportName()}Report`, JSON.stringify(dataReport))
        readAndDisplayAllAdedPoints()
    }

    const newDiv4 = document.createElement("div")
    const buttonAddToReport = document.createElement("button")
    buttonAddToReport.textContent = "Dodaj widoczne elementy do raportu"
    buttonAddToReport.classList.add("buttonPt3")
    foundPoint3.appendChild(newDiv4)
    newDiv4.classList.add("buttonAddToReport")
    newDiv4.appendChild(buttonAddToReport)
    buttonAddToReport.disabled = (document.querySelectorAll(".addedItemsContainer .addedItem").length) ? false : true
    buttonAddToReport.addEventListener("click", button_addToReport)

}
