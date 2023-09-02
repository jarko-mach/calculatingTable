"use strict"

import { readTemporaryReportName } from "../miscellaneous/misc.js"

export const createMainTable = () => {

    const removeFieldToFill = (e) => {
        // console.log("fieldToFill: e", e)
        e.target.classList.remove("fieldToFill")
    }

    const foundElement = document.querySelector(".entry")
    // console.log("foundElement", foundElement)
    foundElement.innerHTML =
        `<div class="reportTitle">
            <h1> SPRAWOZDANIE NUMER TSO /
            <input type="text" id="numberTSO" class="fieldToFill"> / 
            <input type="text" id="yearTSO" class="fieldToFill">
            </h1>
        </div>
        <h6><h7><i>Lokalna nazwa: </i></h7> ${readTemporaryReportName().slice(1,-1)}</h6>
        <div class="reportTitle">
            <h2>Badania oświetlenia elektrycznego</h2>
        </div>
        <div class="customerGrid">
            <p class="customerLabel">Nazwa i adres Klienta:</p>
            <textarea id="customerName" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Miejsce wykonania badań:</p>
            <textarea id="researchAddress" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Badane czynniki:</p>
            <textarea id="factorsTested" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <div class="customerGrid">
            <p class="customerLabel">Sporządził/a i autoryzował/a:</p>
            <textarea id="complied" class="castomerInput fieldToFill" rows="1"></textarea>
        </div>

        <table class="tableSummary">
          <tbody>
            <tr>
                <td>
                    <p class="customerLabel">Data wykonania badań:</p>
                    <input id="researchDate" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Data sporządzenia sprawozdania:</p>
                    <input id="reportDate" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Egzemplarz sprawozdania:</p>
                    <input id="copyReportNumber" class="castomerInput fieldToFill" type="text">
                </td>
                <td>
                    <p class="customerLabel">Łączna liczba stron sprawozdania:</p>
                    <input id="allPages" class="castomerInput fieldToFill" type="text">
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