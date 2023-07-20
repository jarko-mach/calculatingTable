
const showDialogBox = (header, labelString, commandType) => {
    const foundElement = document.querySelector(".openDialogBox")
    const newElement = document.createElement("div")
    newElement.classList.add("dialogBoxParent")
    newElement.innerHTML =
        ` <div class="dialogBox">
            <div class="dialogBoxHeader" > ${header}
            </div>
            <div class="dialogBoxChild">
                <label for="fileName">${labelString}</label>
                <input type="text" id="fileName">
            </div>
            <div class="dialogBoxChild">
                <button class="okSaveReportTable">${commandType}</button>
                <button class="noSaveReportTable">Anuluj</button>
            </div>
        </div>
    `
    foundElement.append(newElement)
}

export const getFileName = () => {
    showDialogBox("Zapis danych", "Podaj nazwę", "Zapisz")
}
