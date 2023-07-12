import { tableAddNumbers } from "./table-operations.js"
import { convertClassesIntoOneString, classTableRows } from "./app.js"

// ADDING NEW PAGE IF NECESSARY

export const checkToStartNewPage = () => {

    let maxPageHeight = 150     //mm
    let myBottoms = document.querySelectorAll("table")
    let numberOfTables = myBottoms.length
    let tablePosition = Math.round(myBottoms[myBottoms.length - 1].getBoundingClientRect().bottom / 3.779)         //zamiana px na mm

    const dividingTable = () => {
        // let dataTable = JSON.parse(localStorage.getItem("myElement"))

        let readedClassesFromTable = convertClassesIntoOneString(classTableRows)
        let nodeList = document.querySelectorAll(readedClassesFromTable)
        for (let i = 0; i < nodeList.length; i++) {
            let positionY = Math.round(nodeList[i].getBoundingClientRect().bottom / 3.779)
            console.log("i", i, positionY)
            if (positionY > maxPageHeight) {
                let szukanyWiersz = nodeList[i].innerHTML
                console.log("szukanyWiersz", szukanyWiersz)
                szukanyWiersz = `</tbody> </table> ${szukanyWiersz} <table> <tbody> `
                nodeList[i].innerHTML = szukanyWiersz
            }
        }
    }

    dividingTable()
    console.log("tablePosition", tablePosition)

    if (numberOfTables * maxPageHeight - tablePosition < 0) {
        console.log("za dużo")

        // tniemy tabelę

        // 1 - dodaję nagłówek TS
        let lastElement = document.querySelectorAll("table")
        // console.log("lastElement", lastElement)

        let newElement = document.createElement("div")
        newElement.classList.add("threeColumns")
        newElement.innerHTML = ` 
        <p>TECHNO-SERVICE S.A. <br> Pracownia Ochrony Środowiska</p>
        <p> Sprawozdanie TSO &nbsp / <input type="text" class="numberTSO"> / <input type="text" class="yearTSO"></p>
        <p>Strona / Stron <input type="text" class="pageTSO"> / <input type="text" class="pagesTSO"></p>       `
        lastElement[lastElement.length - 1].after(newElement)

        // 2 - rozpoczynam kolejną tabelę
        let lastElement2 = document.querySelector("footer")
        let newElement2 = document.createElement("div")
        newElement2.innerHTML = ` 
            <table>
                <thead>
                    <tr class="showNumbers">
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>       `
        lastElement2.before(newElement2)
        tableAddNumbers()

    }
}

const calculateBottomOfTable = (elem) => {
    let myBottom = document.querySelector("table")
    let myPosition = Math.round(myBottom.getBoundingClientRect().bottom / 3.779)
    // 1 mm to 3,779 px

    console.log("badamy element ", elem, "dół strony ma pozycję ", myPosition)
    // if (myPosition = 130) {
    // zanim dodam nową linię to sprawdzam, czy cała strona ma więcej niż np. 290 mm
    // wtedy dodaję <tr> o wysokości np. 30 mm (trzeba ustalić górny i dolny margines)
    // i jadymy dalej
    console.log("coś za długa ta strona")
    startNextPage()
    // }
}

const startNextPage = () => {
    // była to funkcja  addThreeColumnsHeader

    // 1 - dodaję nagłówek TS
    let lastElement = document.querySelectorAll("table")
    console.log("lastElement", lastElement)

    let newElement = document.createElement("div")
    newElement.classList.add("threeColumns")
    newElement.innerHTML = ` 
        <p>TECHNO-SERVICE S.A. <br> Pracownia Ochrony Środowiska</p>
        <p> Sprawozdanie TSO &nbsp / <input type="text" class="numberTSO"> / <input type="text" class="yearTSO"></p>
        <p>Strona / Stron <input type="text" class="pageTSO"> / <input type="text" class="pagesTSO"></p>       `
    lastElement[lastElement.length - 1].after(newElement)

    // 2 - rozpoczynam kolejną tabelę
    lastElement = document.querySelector("footer")
    newElement = document.createElement("div")
    newElement.innerHTML = ` 
    <table>
        <thead>
            <tr class="showNumbers">
            </tr>
        </thead>
        <tbody>
            <tr>table row</tr>
        </tbody>
    </table>       `
    lastElement.before(newElement)

    tableAddNumbers()
}