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

console.log("1", tableData[0]?.details.illumination())

let element = document.querySelector('.container2')
element.style.gridTemplateAreas = " lp miejsce zmierzone eksploatacyjne eksploatacyjne rownomiernosc rownomiernosc zgodnosc"
" lp miejsce zmierzone eksploatacyjne1 eksploatacyjne2 rownomiernosc1 rownomiernosc2 zgodnosc"
" myNumber1 myNumber2 myNumber3 myNumber4 myNumber5 myNumber6 myNumber7 myNumber8 ";


const addNewDataLine = () => {

    for (let i = 1; i < 9; i++) {
        const newParagraph = document.createElement('p')
        newParagraph.classList.add(`"item-data${i}"`)
        newParagraph.classList.add("item-data")
        newParagraph.innerText = `dane${i}`
        element.append(newParagraph)
    }
    element.style.gridTemplateAreas += "data1 data2 data3 data4 data5 data6 data7 data8"
    return "dodałem linię"
}

console.log(addNewDataLine())

// newLine.innerHTML = `
//     <p class="item-data1">dana1</p>
//     <p class="item-data2">dana2</p>
//     <p class="item-data3">dana3</p>
//     <p class="item-data4">dana4</p>
//     <p class="item-data5">dana5</p>
//     <p class="item-data6">dana6</p>
//     <p class="item-data7">dana7</p>
//     <p class="item-data8">dana8</p>
//     `

// lastElement.after(newLine)

// let addNewInfo = document.querySelector('.addNewData')
