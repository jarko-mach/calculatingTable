"use strict"

export const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ante eu urna vestibulum accumsan. Nulla facilisi. Sed consequat quam sem, ac gravida libero dictum a. Donec mollis velit scelerisque erat iaculis commodo. Maecenas interdum neque vel dui"


const certificate = `Certyfikat Akredytacji Laboratorium Badawczego Nr AB 481 – akredytacja udzielona przez Polskie Centrum Akredytacji dn. 05.05.2004r. Zakres akredytacji nr AB 481 wydanie nr 22 z 29.03.2022r.`
const regulation = `Rozporządzenie Ministra Zdrowia z dnia 02.02.2011r., w sprawie badań i pomiarów czynników szkodliwych dla zdrowia w środowisku pracy (Dz. U. Nr 33, poz. 166).`
const purposeOfLightResearch = "Sprawdzenie zgodności oświetlenia elektrycznego z wymaganiami PN-EN 12464-1:2012 w"
const purposeOfHealthResearch = "Badania czynników szkodliwych dla zdrowia w środowisku pracy i porównanie uzyskanych wyników/rezultatów badań z wartościami dopuszczalnymi określonymi w przepisach prawnych."

export const fixedPointsInfo_tableData = [
    {
        name: "Badania oświetlenia elektrycznego",
        point1: ["", certificate],
        point2: purposeOfLightResearch,
    },
    {
        name: "Badania czynników szkodliwych dla zdrowia w środowisku pracy",
        point1: ["", regulation, certificate],
        point2: purposeOfHealthResearch,
    }
]
