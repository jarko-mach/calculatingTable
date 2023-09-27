
import { tempInformations } from "./miscellaneous/misc.js"
import { dataReportOriginal } from "./miscellaneous/misc.js"

export const test1 = () => {
    let dataReport = JSON.parse(JSON.stringify(dataReportOriginal))
    dataReport.point3.elements.push({name:"1", shortName:"2", description:"3"})
    console.log("dataReport", dataReport)
    // dataReport.point3

}

test1()