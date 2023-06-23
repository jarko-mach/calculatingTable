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


const dataTypes = [
    {
        element: "input",
        type: "number",
        value: "1",
        class1: "item-data-lp",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-miejsce",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-zmierzone",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-eksploatacyjne1",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-eksploatacyjne2",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-rownomiernosc1",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-rownomiernosc2",
        class2: "item-data",
    },
    {
        element: "textarea",
        class1: "item-data-zgodnosc",
        class2: "item-data",
    },
    {
        element: "button",
        class1: "item-data",
        class2: "recalc"
    },
]

const addLine = () => {
    for (let i = 1; i <= 9; i++) {

        let newElement = document.createElement(dataTypes[i - 1].element)

        if (dataTypes[i - 1].element === "input") {
            console.log("1", dataTypes[i - 1].element)
            newElement.setAttribute("type", dataTypes[i - 1].type)
            newElement.setAttribute("value", dataTypes[i - 1].value)
        }

        newElement.classList.add(dataTypes[i - 1].class1)
        newElement.classList.add(dataTypes[i - 1].class2)
        elementTable.append(newElement)

        if (dataTypes[i - 1].element === "button") {
            newElement = document.querySelectorAll(".recalc").forEach(item => item.innerText = "Przelicz")
        }
    }
}

const createNextLine = () => {
    addLine()
}

const elementTable = document.querySelector('.container')

const buttoNewLine = document.querySelector("#buttonAdd")
buttoNewLine.addEventListener('click', createNextLine)



