
"use strict";

import { tempInformations } from "../../miscellaneous/misc.js";

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


export const exportPoint0_Word = () => {
    const localReportName = tempInformations[0].reportName
    const localTableName = tempInformations[5].tableName
    // const localTabName = tabName.slice(1, tabName.length - 1)

    let dataReport = JSON.parse(localStorage.getItem(`${localReportName}Report`))
    let dataTable = JSON.parse(localStorage.getItem(localTableName))
    console.log("dataReport", dataReport)
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

    const paragraphEmpty = new docx.Paragraph({
        style: "title",
        text: ``,
        alignment: AlignmentType.CENTER,
    })

    // const paragraphEmpty2 = () => {
    //     let oneParagraph = new docx.Paragraph({
    //         style: "title",
    //         text: `.../.../.../...`,
    //         alignment: AlignmentType.CENTER,
    //     })
    //     let myString = `children: [${oneParagraph}]`
    //     console.log("oneParagraph", oneParagraph)
    //     return myString
    // }


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
                            new docx.Paragraph({
                                style: "customer",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.customerName}`,
                                        bold: true,
                                    })
                                ],
                            }),
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
                            new docx.Paragraph({
                                style: "customer",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.researchAddress}`,
                                        bold: true,
                                    })
                                ],
                            }),
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
                            new docx.Paragraph({
                                style: "customer",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.factorsTested}`,
                                        bold: true,
                                    })
                                ],
                            }),
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
                            new docx.Paragraph({
                                style: "customer",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.complied}`,
                                        bold: true,
                                    })
                                ],
                            }),
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
        let myString = dataReport.point1.created ?
            new docx.Paragraph({
                style: "point", text: `1. PODSTAWA WYKONANIA BADAŃ`, alignment: AlignmentType.LEFT,
            }) : ""
        return myString
    }

    const point_1_1 = () => {
        let myString = dataReport.point1.created ?
            new docx.Paragraph({
                style: "normal",
                children: [
                    new docx.TextRun({
                        text: `1.1.  `,
                        bold: true,
                    }),
                    new docx.TextRun({
                        text: `${dataReport.point1.text1_1}`, alignment: AlignmentType.LEFT,
                    })
                ]
            }) : ""
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
                    new docx.TextRun({
                        text: `${dataReport.point1.text1_2}`, alignment: AlignmentType.LEFT,
                    })
                ]
            }) : ""
        return myString
    }

    const point_2 = () => {
        let myString = dataReport.point2.created ?
            new docx.Paragraph({
                style: "point", text: `2. CEL BADAŃ`, alignment: AlignmentType.LEFT,
            }) : ""
        return myString
    }

    const point_2_1 = () => {
        let myString = dataReport.point2.created ?
            new docx.Paragraph({
                style: "normal",
                text: `${dataReport.point2.text2}`, alignment: AlignmentType.LEFT,
            }) : ""
        return myString
    }

    const point_3 = () => {
        let myString = dataReport.point3.created ?
            new docx.Paragraph({
                style: "point", text: `3. METODYKA BADAŃ`, alignment: AlignmentType.LEFT,
            }) : ""
        return myString
    }

    // const point_3_1 = () => {
    //     // let myString = dataReport.point3.created ? {
    //         ...dataReport.point3.elements.map((element, index) => {
    //             console.log("element", index, element)
    //             return new docx.Paragraph({
    //                 style: "normal",
    //                 children: [
    //                     new docx.TextRun({
    //                         text: `${element}`, alignment: AlignmentType.LEFT,
    //                         bold: true,
    //                     }),
    //                     new docx.TextRun({
    //                         text: `${index}`, alignment: AlignmentType.LEFT,
    //                     })
    //                 ]
    //             })
    //         })
    //     // } : "1"
    //     console.log("myString", myString)
    //     return myString
    // }

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
                        indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
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
                    paragraphEmpty,
                    paragraphEmpty,
                    paragraphEmpty,
                    paragraphEmpty,
                    paragraphSprawozdanie,
                    paragraphEmpty,
                    paragraphBadania,
                    paragraphEmpty,
                    // paragraphTabela1,
                    paragraphEmpty,
                    paragraphEmpty,
                    paragraphEmpty,
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
                    ...dataReport.point3.elements.map((element, index) => {
                        console.log("element", index, element)
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
                                new docx.TextRun({
                                    text: element.description,
                                })
                            ]
                        })
                    }),

                    new docx.Paragraph({
                        pageBreakBefore: true,
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

}
