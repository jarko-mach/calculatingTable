"use strict"

// Przepisy prawne

export const law_regulations = [
    {
        description: `pyły, czynniki chemiczne, hałas, drgania, mikroklimat umiarkowany, mikroklimat zimny`,
        regulations: [`Rozporządzenie Ministra Rodziny, Pracy i Polityki Społecznej z dnia 12.06.2018r. w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz.U. z dnia 03.07.2018r., poz. 1286).`]
    },
    {
        description: `mikroklimat gorący`,
        regulations: [`Rozporządzenie Ministra Rozwoju, Pracy i Technologii z dnia 18.02.2021r. zmieniające rozporządzenie w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz. U. z dnia 19 lutego 2021r., poz. 325).`]
    },
    {
        description: `pyły drewna`,
        regulations: [`Rozporządzenie Ministra Rodziny, Pracy i Polityki Społecznej z dnia 09.01.2020r. zmieniające rozporządzenie w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz .U. z dnia 15.01.2020r., poz. 61).`,
            `Rozporządzenie Ministra Zdrowia z dnia 10.02.2021r. zmieniające rozporządzenie w sprawie substancji chemicznych, ich mieszanin, czynników lub procesów technologicznych o działaniu rakotwórczym lub mutagennym w środowisku pracy (Dz. U. 2021, poz.279).`]
    },
    {
        description: `wwa, związki cr (vi), formaldehyd, chloroeten (chlorek winylu)`,
        regulations: [`Rozporządzenie Ministra Rodziny, Pracy i Polityki Społecznej z dnia 09.01.2020r. zmieniające rozporządzenie w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz.U. z dnia 15.01.2020r., poz. 61).`,
            `Rozporządzenie Ministra Zdrowia z dnia 30 grudnia 2004 r. w sprawie bezpieczeństwa i higieny pracy związanej z występowaniem w miejscu pracy czynników chemicznych (Dz. U. Nr 11, poz. 86).`,
            `Rozporządzenie Ministra Zdrowia z dnia 10.02.2021r. zmieniające rozporządzenie w sprawie substancji chemicznych, ich mieszanin, czynników lub procesów technologicznych o działaniu rakotwórczym lub mutagennym w środowisku pracy (Dz. U. 2021, poz.279).`]
    },
    {
        description: `spaliny silnika diesla`,
        regulations: [`Rozporządzenie Ministra Rozwoju, Pracy i Technologii z dnia 18.02.2021r. zmieniające rozporządzenie w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz.U. z dnia 19 lutego 2021r., poz. 325).`,
            `Rozporządzenie Ministra Zdrowia z dnia 30 grudnia 2004 r. w sprawie bezpieczeństwa i higieny pracy związanej z występowaniem w miejscu pracy czynników chemicznych (Dz. U. Nr 11, poz. 86).`,
            `Rozporządzenie Ministra Zdrowia z dnia 10.02.2021r. zmieniające rozporządzenie w sprawie substancji chemicznych, ich mieszanin, czynników lub procesów technologicznych o działaniu rakotwórczym lub mutagennym w środowisku pracy (Dz. U. 2021, poz.279).`]
    },
    {
        description: `Badania oświetlenia elektrycznego`,
        regulations: [`Rozporządzenie Ministra Pracy i Polityki Społecznej zmieniające rozporządzenie w sprawie ogólnych przepisów bezpieczeństwa i higieny pracy z dn. 02.03.2007r. (Dz. U. Nr 49, poz.330).`, 
        `Obwieszczenie Ministra Rozwoju i Technologii z dnia 15.04.2022r. (Dz. U. 2022r., poz.1225) w sprawie ogłoszenia jednolitego tekstu rozporządzenia Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie.`,
        `Rozporządzenie Ministra Pracy i Polityki Socjalnej z dnia 01.12.1998r. w sprawie bezpieczeństwa i higieny pracy na stanowiskach wyposażonych w monitory ekranowe (Dz.U.1998 Nr 148, poz. 973).`]
    },
    {
        description: `oświetlenie awaryjne`,
        regulations: [`Obwieszczenie Ministra Rozwoju i Technologii z dnia 15.04.2022r. (Dz. U. 2022r., poz.1225) w sprawie ogłoszenia jednolitego tekstu rozporządzenia Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie.`]
    },
    {
        description: `mikroklimat zimny`,
        regulations: [`Rozporządzenie Ministra Rodziny, Pracy i Polityki Społecznej z dnia 12.06.2018r. w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz.U. z dnia 03.07.2018r., poz. 1286).`]
    },
    {
        description: `mikroklimat gorący`,
        regulations: [`Rozporządzenie Ministra Rozwoju, Pracy i Technologii z dnia 18.02.2021r. zmieniające rozporządzenie w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz. U. z dnia 19 lutego 2021r., poz. 325).`]
    },
    {
        description: `wilgotność względna powietrza i temperatura`,
        regulations: [`Obwieszczenie Ministra Rozwoju i Technologii z dnia 15.04.2022r. (Dz. U. 2022r., poz.1225) w sprawie ogłoszenia jednolitego tekstu rozporządzenia Ministra Infrastruktury w sprawie warunków technicznych, jakim powinny odpowiadać budynki i ich usytuowanie.`,
            `Rozporządzenie Ministra Pracy i Polityki Socjalnej z dnia 01.12.1998r. w sprawie bezpieczeństwa i higieny pracy na stanowiskach wyposażonych w monitory ekranowe (Dz.U.1998 Nr 148, poz. 973).`]
    },
    {
        description: `drgania i hałas`,
        regulations: [`Rozporządzenie Ministra Rodziny, Pracy i Polityki Społecznej z dnia 12.06.2018r. w sprawie najwyższych dopuszczalnych stężeń i natężeń czynników szkodliwych dla zdrowia w środowisku pracy (Dz.U. z dnia 03.07.2018r., poz. 1286).`,
            `Rozporządzenie Gospodarki i Pracy z dnia 5 sierpnia 2005r. w sprawie bezpieczeństwa i higieny pracy przy pracach związanych z narażeniem na hałas lub drgania mechaniczne (Dz. U. Nr 157, poz. 1318).`]
    }]
