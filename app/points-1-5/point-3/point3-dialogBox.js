"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
import { point03_TableData } from "./point3-data.js";

export const addPoint3_DialogBox = () => {

    const contentOfCenterWindow = (selectedNumber) => {
        let localShortName = ""
        let localCode = ""
        point03_TableData[selectedNumber].elements.forEach((elem, index) => {
            localShortName = (elem.shortName) ? `<span class="shortNameColor">${elem.shortName}</span>` : ""
            localCode += `<div class="contentCenter finger" id="element${index}" data-index=${index}><input type="checkbox"> ${localShortName} ${elem.name} </div>`
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

        const name_Color = (e) => {
            e.currentTarget.classList.add("addedColor")
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
            // eleme.addEventListener("click", name_Color)
            eleme.addEventListener("click", selectName)
            eleme.addEventListener("mouseout", name_UnBold)
            eleme.addEventListener("mouseover", name_Bold)
        })
    }

    const mainName_Bold = (evt) => {
        evt.target.classList.add("bolded")
        console.log("BOLD evt.target", evt.target)
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
    const foundPoint3 = document.querySelector(".dialogBoxMain")
    const newContainer = document.createElement("div")
    newContainer.classList.add("container")
    foundPoint3.appendChild(newContainer)

    const newDiv3a = document.createElement("div")
    newDiv3a.classList.add("boxLeft")
    point03_TableData.forEach((element, index) => {
        newDiv3a.innerHTML += `<div class="contentLeft finger" id="mainName${index}" data-index="${index}"> ${element.mainName} </div>`
    })
    newDiv3a.innerHTML += `</div">`
    newContainer.appendChild(newDiv3a)

    const listElements = document.querySelectorAll(".point3 .contentLeft")
    listElements.forEach((eleme, index) => {
        // console.log(index, "eleme", eleme)
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


export const dialogBox_chooseMethods = () => {

    const getOKButton = () => {
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = `<div class="openDialogBox"></div>`
    }

    const getCancelButton = () => {
        const foundElement = document.querySelector(".openDialogBox")
        foundElement.innerHTML = `<div class="openDialogBox"></div>`
    }

    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")

    newElement.innerHTML =
        ` <div class="dialogBox">
            <div class="dialogBoxHeader wider900" > Metodyka badań
            </div>
            <div class="dialogBoxPoint3 wider900">
                <div class="dialogBoxMain">
                    <p>Wybierz grupę:</p>
                </div>
                <div>
                    <button class="okSave">Wczytaj</button>
                    <button class="noCancel">Anuluj</button>
                </div>        
            </div>
        </div>
      `
    foundElement.append(newElement)
    addPoint3()
    const foundButtonOK = document.querySelector(".openDialogBox .okSave")
    foundButtonOK.addEventListener("click", getOKButton)

    const foundButtonCancel = document.querySelector(".openDialogBox .noCancel")
    foundButtonCancel.addEventListener("click", getCancelButton)
}
