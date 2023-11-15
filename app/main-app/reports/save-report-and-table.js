
import { dataReportOriginal, readTemporaryReportName, tempInformations } from "../../miscellaneous/misc.js"
import { saveTable } from "../../points-all/point-5/table5a-lighting/table5a-operations.js"


export const saveReportAndTable = () => {

    let foundClasses = ""
    for (const element in dataReportOriginal) { foundClasses += `#${element}, ` }
    let myClasses = foundClasses.slice(0, foundClasses.length - 2)
    console.log("zapisuję raport i tablicę, klasy:", myClasses)
    const nodeList = document.querySelectorAll(myClasses)

    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))
    dataReport.point3.elements.shift()

    console.log("saveReportAndTable - ...", dataReport)
    // debugger
    const nameOfReport = readTemporaryReportName()

    let nodeListCounter = 0
    for (let element in dataReport) {

        if (element === "id") {
            dataReport[`${element}`] = Date.now()
            continue
        }

        if (element === "point1") {
            dataReport[`${element}`].created = tempInformations[1].created
            if (tempInformations[1].created) {
                dataReport[`${element}`].text1_1 = document.querySelector("#point11Text").value
                dataReport[`${element}`].text1_2 = document.querySelector("#point12Text").value
                dataReport[`${element}`].text1_3 = document.querySelector("#point13Text")?.value

            }
            continue
        }
        if (element === "point2") {
            if (tempInformations[2].created) {
                dataReport[`${element}`].created = tempInformations[2].created
                dataReport[`${element}`].text2 = document.querySelector("#point2Text").value
            }
            continue
        }
        if (element === "point3") { //-------------------------------------------------------------------
            if (tempInformations[3].created) {
                dataReport[`${element}`].created = tempInformations[3].created
                const locElementts = document.querySelectorAll(".point3 .addedElement")
                locElementts.forEach((elem, indx) => {
                    // console.log("items", indx, elem.firstElementChild.nextElementSibling.textContent)
                    // debugger
                    dataReport.point3.elements.push({ name: elem.firstElementChild.value, description: elem.firstElementChild.nextElementSibling?.value })
                })
            }
            continue
        }
        if (element === "point4") {
            dataReport[`${element}`].created = tempInformations[4].created
            continue
        }
        if (element === "point5") {
            // console.log("zapisuję raport punkt 5")
            dataReport[`${element}`].created = tempInformations[5].created
            // console.log("i dalej...", dataReport[`${element}`].created)
            if (tempInformations[5].created) {
                let localTabNam = tempInformations[5].tableName
                dataReport[`${element}`].tableName = localTabNam
                console.log("nazwa taleli: ", localTabNam)
                saveTable(localTabNam)
            }
            continue
        }
        if (element === "point7") {
            dataReport[`${element}`].created = tempInformations[7].created
            continue
        }
        dataReport[`${element}`] = nodeList[nodeListCounter].value

        // console.log("save raport - element", dataReport[`${element}`])

        nodeListCounter++
    }
    // console.log("2 saveOnlySomeOfReport - zapisuję dane:", dataReport)
    localStorage.setItem(`${nameOfReport}Report`, JSON.stringify(dataReport))
}

