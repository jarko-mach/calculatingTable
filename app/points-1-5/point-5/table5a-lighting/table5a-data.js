"use strict"

import { tableAddDataLine, tableAddEmptyLine, tableAddTextLine, tableAddThinLine, tableAddTextBoldLine } from "./table5a-operations.js"
import { checkbox_RemoveTableRow_Changed, checkbox_ADDTableRow_Changed } from "./table5a-operations.js"
import { tableRecalcAll } from "./table5a-recalculate.js"
import { operationIsDone_andSaveAll } from "../../../miscellaneous/misc.js"
import { tableMenu_ShowHideAllDescriptions } from "./table5a-createMenu.js"

export let tableMenu_ButtonsInfo = [
    {
        id: "buttonRecalc",
        class: "button",
        buttonText: "Przelicz",
        descriptionText: `<p>Odczytuje zmierzone wartości natężenia oświetlenia z kolumny [3]. 
    Do odseparowania liczb można używać <b>przecinka</b> lub <b>średnika</b>. 
    Do wskazywania części dziesiętnych można używać <b>kropki</b> lub <b>przecinka</b>. 
    Po sprawdzeniu, że dane zostały wpisane poprawnie, następują obliczenia i zostają dopisane wyniki w kolumnach [4] i [6]. <br>
    Brak wprowadzonych danych lub błędnie wprowadzone dane w kolumnach [5] i [7] spowodują niemożność obliczenia stanu w kolumnie [8]</p>`,
        descriptionClass: "tableMenuDescription1",
        disabled: "",
        functionPerformed: function () { tableRecalcAll(), operationIsDone_andSaveAll() },
    },
    {
        id: "buttonExport",
        class: "button",
        buttonText: "Eksportuj",
        descriptionText: "<p>Umożliwia wyeksportowanie sprawozdania w formacie DOCX, który można otwierać korzystając np. z programu Word.</p>",
        descriptionClass: "tableMenuDescription1",
        disabled: "",
        functionPerformed: function () { exportnewTable_Word() }, //exportDocument(), operationIsDone_andSaveAll() 
    },

    {
        id: "buttonAddHeader",
        class: "button",
        buttonText: "Nagłówek",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem, którego tekst zostanie pogrubiony/wytłuszczony - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "tableMenuDescription2",
        disabled: "",
        functionPerformed: function () { tableAddTextBoldLine(), operationIsDone_andSaveAll() },
        // tableMenu_checkboxGreyBackgroundChanged(),
    },
    {
        id: "buttonAddPlace",
        class: "button",
        buttonText: "Stanowisko",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do wpisania miejsca pomiarów - nie dodaje pól obliczeniowych</p>",
        descriptionClass: "tableMenuDescription3",
        disabled: "",
        functionPerformed: function () { tableAddTextLine(), operationIsDone_andSaveAll() },
        // tableMenu_checkboxGreyBackgroundChanged(), 
    },
    {
        id: "buttonAdd",
        class: "button",
        buttonText: "Pomiary",
        descriptionText: "<p>Dodaje do tabeli jeden wiersz z polem do opisu obszaru, polem do wprowadzenia pomiarów oraz norm. Klawiszem 'Przelicz' dokonujemy obliczeń oraz sprawdzamy zgodność pomiarów z PN </p>",
        descriptionClass: "tableMenuDescription4",
        disabled: "",
        functionPerformed: function () { tableAddDataLine(), operationIsDone_andSaveAll() },
    },
    {
        id: "buttonAddSpace",
        class: "button",
        buttonText: "Pusty wiersz",
        descriptionText: "<p>Dodaje do tabeli jeden pusty wiersz - można go używać do: <br> 1° oddzielania kilku grup linii tekstu od siebie <br> 2° oddzielenia linii tekstu od linii graficznej</p>",
        descriptionClass: "tableMenuDescription5",
        disabled: "",
        functionPerformed: function () { tableAddEmptyLine(), operationIsDone_andSaveAll() },
    },
    {
        id: "buttonAddThinLine",
        class: "button",
        buttonText: "Linię",
        descriptionText: "<p>Dodaje cienką widoczną graficzną linię na końcu tabeli</p>",
        descriptionClass: "tableMenuDescription6",
        disabled: "",
        functionPerformed: function () { tableAddThinLine(), operationIsDone_andSaveAll() },
    },
]

// START DEFINITION OF CHECKBOXES IN TABLE MENU

export let tableMenu_CheckBoxInfo = [
    {
        id: "removeTableRow",
        name: "removeTableRow",
        checked: "",
        disabled: "",
        labelId: "labelCB1",
        labelFor: "removeTableRow",
        class: "labelCB",
        checkboxText: "usuwanie",
        descriptionText: "<p>Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to pozwala usuwać wybrane wiersze tabeli badań kliknięciem myszki</p>",
        descriptionClass: "tableMenuDescription101",
        functionPerformed: function () { checkbox_RemoveTableRow_Changed() },
    },
    {
        id: "addTableRow",
        name: "addTableRow",
        checked: "",
        disabled: "",
        labelId: "labelCB2",
        labelFor: "addTableRow",
        class: "labelCB",
        checkboxText: "wstawianie",
        descriptionText: "<p>Uaktywnij opcję 'wstawianie', a następnie poruszając kursorem nad tabelą wybierz wiersz/rząd. Po kliknięciu myszką w istniejącą wiersz tabeli otwiera się okno dialogowe, które pozwala wybrać gdzie i jaki wiersz zostanie dodany do tabeli.</p>",
        descriptionClass: "tableMenuDescription101",
        functionPerformed: function () { checkbox_ADDTableRow_Changed() },
    },
    // {
    //     id: "addGreyBackground",
    //     name: "addGreyBackground",
    //     checked: "",
    //     disabled: "",
    //     labelId: "labelCB3",
    //     labelFor: "addGreyBackground",
    //     class: "labelCB",
    //     checkboxText: "wyszarzenie",
    //     descriptionText: "<p>OPCJA DO ZMIANY - Jeżeli poza nagłówkiem tabeli istnieją dopisane wiersze (dane), to dodaje szare tło tylko do tych pól, które można edytować</p>",
    //     descriptionClass: "tableMenuDescription102",
    //     functionPerformed: function () { tableMenu_checkboxGreyBackgroundChanged() },
    // },
    {
        id: "showDescriptions",
        name: "showDescriptions",
        checked: "",
        disabled: "",
        labelId: "labelCB4",
        labelFor: "showDescriptions",
        class: "labelCB",
        checkboxText: "opis przycisków",
        descriptionText: "<p>Włącza / wyłącza pojawianie się pól z wyjaśnieniami</p>",
        descriptionClass: "tableMenuDescription103",
        functionPerformed: function () { tableMenu_ShowHideAllDescriptions() },
    },
]