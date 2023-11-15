"use strict"

import { law_regulations } from "./point3-data-law.js"

export const transformString_JsonToHtml = (information) => {
    // console.log("PLUM")
    const information_Table = [];
    information_Table.push(information)
    let stringToFind_Table = [
        { js_on: /\n/g, ht_ml: `<br>` },
        { js_on: /m2/g, ht_ml: "m<sup>2</sup>" },
        { js_on: /m3/g, ht_ml: "m<sup>3</sup>" },          //<sup>3</sup>    &#179
        { js_on: /s2/g, ht_ml: "s<sup>2</sup>" },
        { js_on: /s3/g, ht_ml: "s<sup>3</sup>" }
    ]
    let elementFound = false
    let counter = 0

    stringToFind_Table.forEach((element, index) => {
        elementFound = element.js_on.test(information_Table[counter]);

        if (elementFound) {
            let replaceElement = information_Table[counter].replace(element.js_on, element.ht_ml)
            information_Table.push(replaceElement);
            counter++;
        }
    })
    return information_Table.pop()
}

export const transformString_JsonToWord = (information) => {

    const elementsToReplace_Table = [];

    let stringsToReplace_Table = [
        { js_on: "\n", wo_rd: { text: "", break: 1, }, },
        { js_on: "&#178", wo_rd: { text: "2", superScript: true, } },
        { js_on: "&#179", wo_rd: { text: "3", superScript: true, } },
    ]
    let myString
    let myArr

    stringsToReplace_Table.forEach((element_js) => {
        myString = information.matchAll(element_js.js_on)
        myArr = [...myString]
        myArr.forEach((element) => {
            elementsToReplace_Table.push({ position: element.index, js_on: element_js.js_on, wo_rd: element_js.wo_rd })
        })
    })

    function mySort(a, b) {
        let A = a.position;
        let B = b.position;
        if (A < B) { return -1 }
        if (A > B) { return 2 }
        return 0
    }
    elementsToReplace_Table.sort(mySort)

    const onlyText_Table = []
    let stringCharNumber = 0

    for (let i = 0; i < elementsToReplace_Table.length; i++) {
        onlyText_Table[i] = information.substring(stringCharNumber, elementsToReplace_Table[i].position)
        stringCharNumber = elementsToReplace_Table[i].position + elementsToReplace_Table[i].js_on.length
    }

    // console.log(stringCharNumber, information.length)

    if (stringCharNumber < information.length) {
        onlyText_Table[elementsToReplace_Table.length] = information.substring(stringCharNumber, information.length)
        elementsToReplace_Table.push({ position: information.length, js_on: "", wo_rd: "" })
    }

    let wordTable = []
    let wordTableCounter = 0
    // console.log("onlyText_Table", onlyText_Table, "elementsToReplace_Table", elementsToReplace_Table)

    for (let i = 0; i < onlyText_Table.length; i++) {
        // console.log("elemnt:", i, onlyText_Table[i])
        wordTable.push({ text: onlyText_Table[i] })
        wordTable.push(elementsToReplace_Table[i].wo_rd)
    }
    // wordTable.push({ text: onlyText_Table[i] })

    // console.log("elementsToReplace_Table", elementsToReplace_Table)
    // console.log("onlyText_Table ", onlyText_Table)
    // console.log("word ", wordTable)
    return wordTable;
}

// console.log(transformString_JsonToWord("Ala \n ma ASA&#178 \n i objętość to 12 m&#179 \n "))

export const transformString_htmlToJson = (information) => {
    // console.log("1", information)
    const information_Table = [];
    information_Table.push(information)
    let stringToFind_Table = [
        { js_on: "\n", ht_ml: /<br>/g },
        { js_on: "m&#178", ht_ml: /m<sup>2<[/]sup>/g },
        { js_on: "m&#179", ht_ml: /m<sup>3<[/]sup>/g },
        { js_on: "s&#178", ht_ml: /s<sup>2<[/]sup>/g },
        { js_on: "s&#179", ht_ml: /s<sup>3<[/]sup>/g }
    ]
    let elementFound = false
    let counter = 0

    stringToFind_Table.forEach((element, index) => {
        // console.log("2", index, element.ht_ml)
        // debugger
        elementFound = element.ht_ml.test(information_Table[counter]);

        if (elementFound) {
            let replaceElement = information_Table[counter].replace(element.ht_ml, element.js_on)
            information_Table.push(replaceElement);
            counter++;
        }
    })
    return information_Table.pop()
}

// in progress

const findLaw = (paramYes, paramNo) => {
    const foundTab = []
    law_regulations.map((element, index) => {
        if (element.description.includes(paramYes)) {
            if (!element.description.includes(paramNo)) {
                element.regulations.forEach((element, index) => { foundTab.push(element) })
            }
        }
    })
    return foundTab
}

console.log(`efekt`, findLaw(`oświetlenie`))

