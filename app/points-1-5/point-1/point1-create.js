
import { point1_tableData } from "./point1-data.js"
import { readTemporaryReportName } from "../../miscellaneous/misc.js";

export const addPoint1_subpoints123 = () => {
    let foundCustomerName = ""
    const foundTitle = document.querySelector(".entry .reportTitle h2").textContent
    let stringText1_123 = ["", "", "", ""]

    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    // console.log("dataReport", dataReport)

    if (dataReport.point1?.created) {
        stringText1_123[0] = dataReport.point1.text1_1
        stringText1_123[1] = dataReport.point1.text1_2
        stringText1_123[2] = dataReport.point1?.text1_3
        // console.log("foundText1_1", stringText1_123)
        // let myTestLine = foundCustomerName
    } else {
        foundCustomerName = document.querySelector(".entry .customerGrid #customerName").value
        // console.log("foundCustomerName", foundCustomerName)
    }
    const foundPoint1 = document.querySelector(".point1")
    const newDiv1 = document.createElement("div")

    newDiv1.innerHTML = ""
    let numbering = 1
    let fieldCounting = 0
    // debugger

    point1_tableData.forEach((element, index) => {
        if (element.name.indexOf(foundTitle) !== -1) {
            for (let elem in element) {
                // console.log("mam", index, elem)
                if (elem === 'name') { continue }
                if (elem === `point1`) {
                    newDiv1.innerHTML += (!dataReport.point1.created) ?
                        `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport">Umowa nr ..... z firmą ${foundCustomerName} z dnia ..... .</textarea></div>`
                        : `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport">${stringText1_123[fieldCounting++]}</textarea></div>`
                    continue
                }
                newDiv1.innerHTML += (!dataReport.point1.created) ?
                    `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport" disabled>${point1_tableData[index][elem]}</textarea></div>`
                    : `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport" disabled>${stringText1_123[fieldCounting++]}</textarea></div>`
            }
            return
        }
    })

    foundPoint1.appendChild(newDiv1)
}