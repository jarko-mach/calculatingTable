"use strict";

import {
    tempInformations
} from "../miscellaneous/misc.js";

import { createStandardTable_5a } from "./table5a-create.js";

tempInformations[5].tableName = "tabela1"
tempInformations[5].created = true
createStandardTable_5a("tabela1")
// console.log("a teraz druga")
// createStandardTable("tabela2")
// console.log("a teraz 3")
// createStandardTable("tabela3")