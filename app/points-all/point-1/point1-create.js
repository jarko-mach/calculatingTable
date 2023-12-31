
import { fixedPointsInfo_tableData } from "../points-all-data.js"
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
    newDiv1.classList.add("partOfReport")
    newDiv1.classList.add("points_all_MarginBottom")

    newDiv1.innerHTML = ""
    let numbering = 1
    let fieldCounting = 0

    fixedPointsInfo_tableData.forEach((element, index) => {
        // debugger
        if (element.name === foundTitle) {
            fixedPointsInfo_tableData[index].point1.forEach((element_p1, index_p1) => {
                console.log(index, "mam", element_p1)
                if (element_p1 === "") {
                    newDiv1.innerHTML += (!dataReport.point1.created) ?
                        `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport tableData">Zlecenie ..... z firmą ${foundCustomerName}, z dnia ..... .</textarea></div>`
                        : `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport tableData">${stringText1_123[fieldCounting++]}</textarea></div>`
                } else {
                    newDiv1.innerHTML += `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport tableData">${element_p1}</textarea></div>`
                }
            })
            foundPoint1.appendChild(newDiv1)
        }
    })
}



// }


//     if (elem === 'name') { continue }
//     if (elem === `point1`) {
//         continue
//     }
//     newDiv1.innerHTML += (!dataReport.point1.created) ?
//         `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport tableData" disabled>${fixedPointsInfo_tableData[index][elem]}</textarea></div>`
//         : `<div class="point1_1"><b>1.${numbering}.</b><textarea id="point1${numbering++}Text" rows="2" class="partOfReport tableData" disabled>${stringText1_123[fieldCounting++]}</textarea></div>`
// }
// return