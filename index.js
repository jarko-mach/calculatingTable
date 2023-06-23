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

const dataTypes = [
    {
        element: "input",
        type: "number",
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
]

const addLine = () => {
    for (let i = 1; i <= 8; i++) {
        let newElement = document.createElement(dataTypes[i - 1].element)

        if (Boolean(dataTypes[i - 1].type)) {
            newElement.setAttribute("type", dataTypes[i - 1].type)
            console.log("2")
        }
        // console.log("3")
        newElement.classList.add(dataTypes[i - 1].class1)
        newElement.classList.add(dataTypes[i - 1].class2)
        element.append(newElement)
    }
}

const createLine = () => {
    addLine()
}

const buttoNewLine = document.querySelector(".buttonAdd")
buttoNewLine.addEventListener('click', createLine)



