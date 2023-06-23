const tableData = [
    {
        lp: 1,
        title: "Produkcja świeżej ryby",
        details: {
            measurmentPlace: "Rampa - rozładunki ryby",
            measurments: [824, 878, 760, 742, 786, 788],
            illumination: function () {
                let average = 0
                this.measurments.forEach((elem) => { average += elem })
                return Number(Math.round(average / this.measurments.length + 'e+2') + 'e-2')
            }
        }
    }]

// console.log("1", tableData[0]?.details.illumination())

const element = document.querySelector('.container')

const addLine = () => {
    for (let i = 1; i < 9; i++) {
        const newElement = document.createElement('textarea')
        newElement.classList.add(`"item-data${i}"`)
        newElement.classList.add("item-data")
        // newElement.setAttribute("type", "button")
        // newElement.setAttribute("maxlength",3)
        // newParagraph.innerText = `dane${i}`
        element.append(newElement)
    }
    return "dodałem linię"
}

const createLine = () => {
    addLine()
}

const buttoNewLine = document.querySelector(".buttonAdd")
buttoNewLine.addEventListener('click', createLine)



