"use strict";

import {
    infoReportsNamesRead,
    infoReportsNamesSave,
    saveTemporaryReportName,
    readTemporaryReportName,
    // readTemporaryTableName,
    // saveTemporaryTableName,
    dataReportOriginal
} from "../miscellaneous/misc.js";

import { dialogBox_chooseOldOrNewReport, dialogBox_readExistingReport } from "./main-dialog-boxes.js";
import { tempInformations } from "../miscellaneous/misc.js";
import { saveTable } from "../table5a-lighting/table5a-operations.js";






//   START PROGRAM

dialogBox_chooseOldOrNewReport()
