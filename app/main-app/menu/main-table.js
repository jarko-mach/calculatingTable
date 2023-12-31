"use strict"

import { readTemporaryReportName, tempInformations } from "../../miscellaneous/misc.js"

export const createMainTable = () => {

    const removeFieldToFill = (e) => {
        // console.log("fieldToFill: e", e)
        e.target.classList.remove("fieldToFill")
    }

    const foundElement = document.querySelector(".entry")
    // console.log("foundElement", foundElement)
    
    foundElement.innerHTML =
        `<div class="reportTitle">
            <h1> SPRAWOZDANIE NR TSO /
            <input type="text" id="numberTSO" class="fieldToFill"> / 
            <input type="text" id="yearTSO" class="fieldToFill">
            </h1>
        </div>
        <h6><h7><i>Lokalna nazwa: </i></h7> ${readTemporaryReportName()}</h6>
        <div class="reportTitle">
            <h2 id="reportType">${tempInformations[0].reportType}</h2>
        </div>
        <div class="customerGrid">
            <p class="customerLabel">Nazwa i adres Klienta:</p>
            <textarea id="customerName" class="customerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Miejsce wykonania badań:</p>
            <textarea id="researchAddress" class="customerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Badane czynniki:</p>
            <textarea id="factorsTested" class="customerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Sporządził/a i autoryzował/a:</p>
            <textarea id="complied" class="customerInput fieldToFill" rows="1"></textarea>
        </div>

        <table class="tableSummary">
          <tbody>
            <tr>
                <td>
                    <p class="customerLabel">Data wykonania badań:</p>
                    <input id="researchDate" class="customerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Data sporządzenia sprawozdania:</p>
                    <input id="reportDate" class="customerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Egzemplarz sprawozdania:</p>
                    <input id="copyReportNumber" class="customerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Łączna liczba stron sprawozdania:</p>
                    <input id="allPages" class="customerInput fieldToFill" type="text">
                </td>
            </tr>
          </tbody>
        </table>
        `
    foundElement.addEventListener("change", removeFieldToFill)
}

export const clearInfoInputIsEmpty = () => {
    const foundElement = document.querySelectorAll(".fieldToFill")
    for (const element of foundElement) element.classList.remove("fieldToFill")
}
