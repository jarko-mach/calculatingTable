"use strict"

import { readTemporaryReportName } from "../../miscellaneous/misc.js";
// import { definitionPurposeOfResearch } from "./point4-data.js";

export const addPoint4 = () => {
    let foundResearchAddress = ""
    const dataReport = JSON.parse(localStorage.getItem(`${readTemporaryReportName()}Report`));
    console.log("pkt4 szukamy...", dataReport)
}