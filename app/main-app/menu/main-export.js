
"use strict";

import { tempInformations } from "../../miscellaneous/misc.js";
import { exportnewTable_Word } from "../../points-1-5/point-5/table5a-lighting/table5a-export-docx.js"
import { transformString_JsonToWord } from "../../points-1-5/point-3/point3-data-operations.js";

import {
    Document,
    convertMillimetersToTwip,
    PageSize,
    Packer,
    Alignment,
    AlignmentType,
    HeadingLevel,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    VerticalAlign,
    TextDirection,
    WidthType,
    PageOrientation,
    PageNumber,
    BorderStyle,
    TableBorders,
    Border,
    NumberFormat,
    UnderlineType, TextRun
} from "../../../docx/build/index.js"
// import { PageNumber } from "docx";



export const exportWord = () => {
    const localReportName = tempInformations[0].reportName
    const localTableName = tempInformations[5].tableName
    // const localTabName = tabName.slice(1, tabName.length - 1)

    let dataReport = JSON.parse(localStorage.getItem(`${localReportName}Report`))
    let dataTable = JSON.parse(localStorage.getItem(localTableName))
    // console.log("dataReport", dataReport)
    // console.log("dataTable", dataTable)

    // debugger
    const tableTS3Columns = new docx.Table({
        alignment: AlignmentType.CENTER,
        verticalAlign: docx.VerticalAlign.CENTER,
        rows: [new docx.TableRow({
            children: [
                new docx.TableCell({
                    borders: {
                        top: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        bottom: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        left: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        right: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                    },
                    verticalAlign: docx.VerticalAlign.CENTER,
                    width: {
                        size: convertMillimetersToTwip(45),
                        type: docx.WidthType.DXA,
                    },
                    children: [
                        new docx.Paragraph({
                            style: "headerTxt",
                            children: [
                                new docx.TextRun({
                                    text: "TECHNO-SERVICE S.A.",
                                }),
                                new docx.TextRun({
                                    text: "Pracownia Ochrony Środowiska",
                                    break: 1,
                                }),

                            ]
                        }),
                    ],
                }),

                new docx.TableCell({
                    borders: {
                        top: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        bottom: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        left: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        right: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                    },
                    verticalAlign: docx.VerticalAlign.CENTER,
                    width: {
                        size: convertMillimetersToTwip(80),
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({
                        style: "headerTxt",
                        text: `Sprawozdanie NR TSO/${dataReport.numberTSO}/${dataReport.yearTSO}`,
                    })
                    ],
                }),
                new docx.TableCell({
                    borders: {
                        top: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        bottom: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        left: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                        right: { style: BorderStyle.THICK, size: .7 * 8, color: "000000" },
                    },
                    verticalAlign: docx.VerticalAlign.CENTER,
                    width: {
                        size: convertMillimetersToTwip(35),
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({
                        style: "headerTxt",
                        children: [
                            new docx.TextRun({
                                children: ["Strona/Stron:  ", docx.PageNumber.CURRENT, "/", docx.PageNumber.TOTAL_PAGES],
                            }),
                        ],
                    })
                    ],
                }),
            ],
        })]
    })

    const paragraphSprawozdanie = new docx.Paragraph({
        style: "title",
        text: `SPRAWOZDANIE NR TSO/${dataReport.numberTSO}/${dataReport.yearTSO}`,
        alignment: AlignmentType.CENTER,
    })

    const paragraphEmpty = (counter) => {
        let myTable = new Array(counter)
        myTable.fill("121")
        // console.log("mytable", myTable, counter)
        return new docx.Paragraph({
            style: "title",
            children: [
                ...myTable.map((element, index) => {
                    return new docx.TextRun({
                        // style: "title",
                        text: "  ",
                        alignment: AlignmentType.CENTER,
                        break: 1,
                    })
                })
            ]
        })
    }

    const paragraphBadania = new docx.Paragraph({
        style: "title",
        text: "Badania oświetlenia elektrycznego",
        alignment: AlignmentType.CENTER,
    })

    const paragraphTabela1 = new docx.Paragraph({
        style: "table1",
        text: "Tabela nr 1",
        alignment: AlignmentType.LEFT,
    })

    const convertingParagraph = (info, isBold, isStyle) => {
        let myTable = transformString_JsonToWord(info)
        return new docx.Paragraph({
            style: isStyle,
            children: [
                ...myTable.map((element, index) => {
                    return new docx.TextRun({
                        text: element.text,
                        break: element.break,
                        superScript: element.superScript,
                        bold: isBold,
                    })
                }),
            ]
        })
    }

    const convertingText = (info, isBold, isStyle) => {
        let myTable = transformString_JsonToWord(info)
        return new docx.TextRun({
            style: isStyle,
            children: [
                ...myTable.map((element, index) => {
                    return new docx.TextRun({
                        text: element.text,
                        break: element.break,
                        superScript: element.superScript,
                        bold: isBold,
                    })
                }),
            ]
        })
    }

    const widthCustomerColumn = convertMillimetersToTwip(40)
    const widthCustomer3Columns = 3 * widthCustomerColumn

    const customerTable = new docx.Table({
        alignment: AlignmentType.CENTER,
        // verticalAlign: docx.VerticalAlign.CENTER,
        // borders: TableBorders.NONE,
        borders: {
            top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
            bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
            left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
            right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
        },
        rows: [
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customer",
                                text: "Nazwa i adres Klienta:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomer3Columns,
                            type: docx.WidthType.DXA,
                        },
                        columnSpan: 3,
                        children: [
                            convertingParagraph(dataReport.customerName, true, "customer"),
                        ],
                    }),]
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customer",
                                text: "Miejsce wykonania badań:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        columnSpan: 3,
                        width: {
                            size: widthCustomer3Columns,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            convertingParagraph(dataReport.researchAddress, true, "customer"),
                        ],
                    }),]
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customer",
                                text: "Badane czynniki:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomer3Columns,
                            type: docx.WidthType.DXA,
                        },
                        columnSpan: 3,
                        children: [
                            convertingParagraph(dataReport.factorsTested, true, "customer"),
                        ],
                    }),]
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customer",
                                text: "Sporządził/a i autoryzował/a:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomer3Columns,
                            type: docx.WidthType.DXA,
                        },
                        columnSpan: 3,
                        children: [
                            convertingParagraph(dataReport.complied, true, "customer"),
                        ],
                    }),]
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: "Data wykonania",
                                    }),
                                    new docx.TextRun({
                                        text: "",
                                        break: 1,
                                    }),
                                    new docx.TextRun({
                                        text: "badań",
                                    })
                                ],
                                // text: "Data wykonania badań:",
                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.researchDate}`,
                                        bold: true,
                                    }),
                                ]
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: "Data sporządzenia",
                                    }),
                                    new docx.TextRun({
                                        text: "",
                                        break: 1,
                                    }),
                                    new docx.TextRun({
                                        text: "sprawozdania",
                                    })]
                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.reportDate}`,
                                        bold: true,
                                    }),
                                ]
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: "Egzemplarz",
                                    }),
                                    new docx.TextRun({
                                        text: "",
                                        break: 1,
                                    }),
                                    new docx.TextRun({
                                        text: "sprawozdania:",
                                    }),
                                ]
                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.copyReportNumber}`,
                                        bold: true,
                                    }),
                                ]
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: "Łączna liczba stron ",
                                    }),
                                    new docx.TextRun({
                                        text: "",
                                        break: 1,
                                    }),
                                    new docx.TextRun({
                                        text: "sprawozdania:",
                                    }),
                                ]

                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.allPages}`,
                                        bold: true,
                                    }),
                                ]
                            }),
                        ],
                    }),

                ]
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        borders: {
                            top: { style: BorderStyle.NONE, size: 0 * 8, color: "000000" },
                            bottom: { style: BorderStyle.NONE, size: 0 * 8, color: "000000" },
                            left: { style: BorderStyle.NONE, size: 0 * 8, color: "000000" },
                            right: { style: BorderStyle.NONE, size: 0 * 8, color: "000000" },
                        },
                        width: {
                            size: widthCustomerColumn,
                            type: docx.WidthType.DXA,
                        },
                        columnSpan: 4,
                        children: [
                            new docx.Paragraph({
                                style: "customerData",
                                alignment: docx.AlignmentType.LEFT,
                                text: ``,

                            }), new docx.Paragraph({
                                style: "customerData",
                                alignment: docx.AlignmentType.LEFT,
                                text: `1. Wyniki badań odnoszą się wyłącznie do badanych obiektów.`,

                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                alignment: docx.AlignmentType.LEFT,
                                text: `2. Bez pisemnej zgody kierownika Pracowni Ochrony Środowiska "Techno-Service" S.A., sprawozdanie nie może być powielane inaczej jak tylko w całości.`,

                            }),
                            new docx.Paragraph({
                                style: "customerData",
                                alignment: docx.AlignmentType.LEFT,
                                text: `3. Klient ma prawo do złożenia skargi.`,

                            }),
                        ],
                    }),
                ]
            }),
        ]
    })

    const point_1 = () => {
        // console.log("pkt 1", dataReport.point1.created)
        let myString = dataReport.point1.created ?
            new docx.Paragraph({ style: "point", text: "1. PODSTAWA WYKONANIA BADAŃ", alignment: AlignmentType.LEFT, })
            : new docx.Paragraph({ text: "Nie dodano punktu 1." })
        return myString
    }

    const point_1_1 = () => {
        let myString = dataReport.point1.created ?
            new docx.Paragraph({
                style: "normal",
                children: [
                    new docx.TextRun({ text: "1.1.  ", bold: true, }),
                    convertingText(dataReport.point1.text1_1, false, "normal"),
                ]
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const point_1_2 = () => {
        let myString = dataReport.point1.created ?
            new docx.Paragraph({
                style: "normal",
                children: [
                    new docx.TextRun({
                        text: `1.2.  `,
                        bold: true,
                    }),
                    convertingText(dataReport.point1.text1_2, false, "normal"),
                ]
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const point_2 = () => {
        // console.log("pkt 2", dataReport.point2.created)
        let myString = dataReport.point2.created ?
            new docx.Paragraph({
                style: "point", text: `2. CEL BADAŃ`, alignment: AlignmentType.LEFT,
            }) : new docx.Paragraph({ text: "Nie dodano punktu 2." })
        return myString
    }

    const point_2_1 = () => {
        let myString = dataReport.point2.created ?
            // convertingText(dataReport.point2.text2, false, "normal") : "....."
            new docx.Paragraph({
                style: "normal",
                text: dataReport.point2.text2,
                alignment: AlignmentType.LEFT,
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const point_3 = () => {
        // console.log("pkt 3", dataReport.point3.created)
        let myString = dataReport.point3.created ?
            new docx.Paragraph({ style: "point", text: `3. METODYKA BADAŃ`, alignment: AlignmentType.LEFT }) : new docx.Paragraph({ text: "Nie dodano punktu 3." })
        return myString
    }

    const point_3_1 = () => {
        let myString = dataReport.point3.created ?
            new docx.Paragraph({
                style: "normal",
                children: [
                    new docx.TextRun({
                        text: "",
                        bold: true,
                    }),
                    ...dataReport.point3.elements.map((element, index) => {
                        return new docx.Paragraph({
                            style: "normal",
                            children: [
                                new docx.TextRun({
                                    text: element.name,
                                    bold: true,
                                }),
                                new docx.TextRun({
                                    text: "  ",
                                }),
                                convertingText(element.description, false, "normal"),
                            ]
                        })
                    })
                ]
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const point_4 = () => {
        // console.log("pkt 4", dataReport.point4.created)
        let myString = dataReport.point4.created ?
            new docx.Paragraph({ style: "point", text: `4. MIEJSCE I OKOLICZNOŚCI BADAŃ`, alignment: AlignmentType.LEFT }) : new docx.Paragraph({ text: "Nie dodano punktu 4." })
        return myString
    }

    const point_4_1 = () => {
        let myString = dataReport.point4.created ?
            new docx.Paragraph({
                style: "normal",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta ante eu urna vestibulum accumsan. Nulla facilisi. Sed consequat quam sem, ac gravida libero dictum a. Donec mollis velit scelerisque erat iaculis commodo. Maecenas interdum neque vel dui",
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const point_5 = () => {
        // console.log("pkt 5", dataReport.point5.created)
        let myString = dataReport.point5.created ?
            new docx.Paragraph({ style: "point", text: `5. ZESTAWIENIE BADAŃ`, alignment: AlignmentType.LEFT }) : new docx.Paragraph({ text: "Nie dodano punktu 5." })
        return myString
    }

    const point_5_1 = () => {
        let myString = dataReport.point5.created ?
            new docx.Paragraph({
                style: "normal",
                text: "Tabela nr 1 – Badania oświetlenia elektrycznego",
            }) : new docx.Paragraph({ text: "" })
        return myString
    }

    const doc = new docx.Document({
        // pageOrientation: docx.PageOrientation.LANDSCAPE,
        styles: {
            paragraphStyles: [
                {
                    id: "tableHeaderNumbers",
                    name: "Numerki",
                    run: {
                        italics: true,
                        size: "8pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    },
                },
                {
                    id: "headerTxt",
                    name: "Nagłówek tabeli",
                    run: {
                        bold: true,
                        size: "8pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    },
                },
                // {
                //     id: "table1",
                //     name: "Tabela nr 1",
                //     run: {
                //         bold: true,
                //         size: "14pt",
                //         font: "Calibri",
                //     },
                //     paragraph: {
                //         alignment: docx.AlignmentType.RIGHT,
                //         spacing: { line: 300, before: 650, after: 0 },
                //     },
                // },
                {
                    id: "title",
                    name: "Tytuł",
                    run: {
                        bold: true,
                        size: "14pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { line: 300, before: 250, after: 320 },
                    },
                },
                {
                    id: "customer",
                    name: "Klient",
                    run: {
                        // bold: true,
                        size: "10pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.LEFT,
                        indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
                        spacing: { line: 250, before: 150, after: 132 },
                    },
                },

                {
                    id: "customerData",
                    name: "Data",
                    run: {
                        // bold: true,
                        size: "9pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                        indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
                        spacing: { line: 250, before: 70, after: 50 },
                    },
                },
                {
                    id: "point",
                    name: "punkt",
                    run: {
                        // italics: true,
                        size: "11pt",
                        font: "Calibri",
                        bold: true,
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.LEFT,
                        // indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
                        spacing: { line: 300, before: convertMillimetersToTwip(6), after: convertMillimetersToTwip(2) },
                    },
                },
                {
                    id: "normal",
                    name: "treść",
                    run: {
                        // italics: true,
                        size: "10pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.LEFT,
                        indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
                        spacing: { line: 250, before: 100, after: 100 },
                    },
                },

            ],
            characterStyles: [
                {
                    id: "small",
                    name: "Small",
                    run: {
                        size: "8pt",
                    },
                },
                {
                    id: "underln",
                    name: "podkreślenie",
                    run: {
                        size: "9pt",
                        underline: {
                            type: UnderlineType.THICK,
                        },
                    },
                },
                {
                    id: "italic",
                    name: "kursywa",
                    run: {
                        italics: true,
                    },
                },
                {
                    id: "bold",
                    name: "pogrubiony",
                    run: {
                        bold: true,
                    },
                }
            ],
        },
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            // orientation: PageOrientation.PORTRAIT,
                            width: "210mm",
                            height: "297mm",
                        },
                        margin: {
                            top: "15mm",
                            right: "15mm",
                            bottom: "15mm",
                            left: "15mm",
                        },
                    },
                },
                children: [
                    paragraphEmpty(4),
                    paragraphSprawozdanie,
                    paragraphBadania,
                    paragraphEmpty(3),
                    customerTable,
                ]
            },
            {
                properties: {
                    page: {
                        size: {
                            // orientation: PageOrientation.PORTRAIT,
                            width: "210mm",
                            height: "297mm",
                        },
                        margin: {
                            top: "15mm",
                            right: "15mm",
                            bottom: "15mm",
                            left: "15mm",
                        },
                        pageNumbers: {
                            start: 2,
                            formatType: docx.NumberFormat.DECIMAL,
                        },
                    },
                },
                headers: {
                    default: new docx.Header({
                        children: [
                            tableTS3Columns,
                            new docx.Paragraph({
                                style: "customerData", text: " ", alignment: AlignmentType.LEFT,
                            })
                            // 
                            // new docx.Paragraph({
                            //     children: [
                            //         new docx.TextRun("Foo Bar corp. "),
                            //         new docx.TextRun({
                            //             children: ["Page Number ", docx.PageNumber.CURRENT],
                            //         }),
                            //         new docx.TextRun({
                            //             children: [" to ", docx.PageNumber.TOTAL_PAGES],
                            //         }),
                            //     ],
                            // }),
                        ],
                    }),
                },
                children: [
                    point_1(),
                    point_1_1(),
                    point_1_2(),
                    point_2(),
                    point_2_1(),
                    point_3(),
                    point_3_1(),
                    point_4(),
                    point_4_1(),
                    point_5(),
                    point_5_1(),
                    new docx.Paragraph({
                        // pageBreakBefore: true,
                        style: "headerTxt",
                        text: "......KONIEC...........  ",
                    }),
                    // tableTS3Columns,
                ],
            },
        ],
    });


    docx.Packer.toBlob(doc).then((blob) => {
        // console.log("blob", blob);
        saveAs(blob, "example.docx");
        // console.log("Document created successfully");
    });

    // exportnewTable_Word()
}


export const exportWord_testing = () => {

    const converting_1 = (info) => {
        let myTable = transformString_JsonToWord(info)
        // console.log("tabela", myTable)

        return new docx.Paragraph({
            children: [
                ...myTable.map((element, index) => {
                    return new docx.TextRun({
                        style: "headerTxt",
                        text: element.text,
                        break: element.break,
                        superScript: element.superScript,
                    })
                }),
            ]
        })
    }

    const doc = new docx.Document({
        sections: [{
            children: [
                converting("Ala \n ma ASA&#178 \n i objętość to 12 m&#179 \n "),
                new docx.Paragraph({
                    style: "headerTxt",
                    text: "......KONIEC...........  ",
                }),
            ]
        }]
    });

    docx.Packer.toBlob(doc).then((blob) => {
        // console.log("blob", blob);
        saveAs(blob, "example.docx");
        // console.log("Document created successfully");
    });
}
