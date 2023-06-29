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
        value: "824, 878, 760, 742, 786, 788",
        class1: "item-data-zmierzone",
        class2: "item-data",
    },
    {
        element: "p",
        class1: "item-data-eksploatacyjne1",
        class2: "item-data",
    },
    {
        element: "input",
        type: "number",
        class1: "item-data-eksploatacyjne2",
        class2: "item-data",
    },
    {
        element: "p",
        class1: "item-data-rownomiernosc1",
        class2: "item-data",
    },
    {
        element: "input",
        type: "number",
        class1: "item-data-rownomiernosc2",
        class2: "item-data",
    },
    {
        element: "p",
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
            newElement.setAttribute("type", dataTypes[i - 1].type)
            newElement.setAttribute("value", dataTypes[i - 1].value)
        }

        if (dataTypes[i - 1].element === "textarea") {
            console.log("1", dataTypes[i - 1].element)
            newElement.setAttribute("type", dataTypes[i - 1].type)
            
        }

        newElement.classList.add(dataTypes[i - 1].class1)
        newElement.classList.add(dataTypes[i - 1].class2)
        elementTable.append(newElement)

        if (dataTypes[i - 1].element === "button") {
            document.querySelectorAll(".recalc").forEach((item) => {
                item.innerText = "Przelicz"
                item.addEventListener('click', recalc)
            })
        }
    }
}

const createNextLine = () => {
    addLine()
}

const recalc = (e) => {
    let calculatedEksploatacyjne
    let calculatedRownomiernosc
    let measurings = document.querySelector(".item-data-zmierzone").value

    const re = /,/;
    measureTable = measurings.split(re);
    measureTable.forEach((elem, index) => { measureTable[index] = Number(measureTable[index]) })

    const computeEksploatacyjne = () => {
        let average = 0
        measureTable.forEach((elem) => { average += elem })
        calculatedEksploatacyjne = Number(Math.round(average / measureTable.length + 'e+0') + 'e-0')
        return calculatedEksploatacyjne
    }

    document.querySelector(".item-data-eksploatacyjne1").innerText = computeEksploatacyjne()

    document.querySelector(".item-data-rownomiernosc1").innerText
        = Number(Math.round(Math.min(...measureTable) / calculatedEksploatacyjne + 'e+2') + 'e-2')
}

const elementTable = document.querySelector('.container')

const buttoNewLine = document.querySelector("#buttonAdd")
buttoNewLine.addEventListener('click', createNextLine)
