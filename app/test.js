
import { tempInformations } from "./miscellaneous/misc.js"
import { dataReportOriginal } from "./miscellaneous/misc.js"
import { point03_TableData } from "./points-1-5/point-3/point3-data.js"

export const test1 = () => {
    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))
    dataReport.point3.elements.push({ name: "1", shortName: "2", description: "3" })
    // console.log("dataReport", dataReport)
}

// test1()


// const tab1 = ["cala", "Bels", "dek", "as"]

// const tab2 = [
//     "Testowe Pyły niesklasyfikowane",
//     `metoda grawimetryczna 11`,
//     "Testowe Pyły drewna",
//     "metoda grawimetryczna 22"
// ]

// function mySort(a, b) {
//     if (a < b) { return -1 }
//     if (a > b) { return 2 }
//     return 0
// }

// function mySort2(a, b) { return a.localeCompare(b) }

// tab2.sort(mySort2)
// console.log("tab2", tab2)

const tab3 = [
    {
        mainName: "22",
        elements: [
            {
                namee: "cTestowe Pyły niesklasyfikowane",
                description: `metoda grawimetryczna 11`
            },
            {
                namee: "aTestowe Pyły drewna",
                description: "metoda grawimetryczna 22",
            },
        ]
    },
    {
        mainName: "2",
        elements: [
            {
                namee: "abTestowe Pyły drewna",
                description: "metoda grawimetryczna 22",
            }

        ]
    }
]


function mySort3(a, b) {
    let myA = a.elements[0].namee
    // console.log("a", myA)
    let myB = b.elements[0].namee
    // console.log("b", myB)
    // console.log("a.localeCompare(b)", myA.localeCompare(myB))
    return myA.localeCompare(myB)
}

tab3.sort(mySort3)
// console.log(...tab3)