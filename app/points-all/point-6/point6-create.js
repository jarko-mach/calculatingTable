"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
// import { definitionPurposeOfResearch } from "./point6-data.js";

export const addPoint6 = () => {
    let foundResearchAddress = ""
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    console.log("pkt6 dataReport.......", dataReport)
}