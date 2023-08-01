// import { TextRun } from "docx"
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
    BorderStyle
} from "../docx/build/index.js"

import { readTemporaryTableReportName } from "./app.js"

// START


const startReadReport = (nameOfReport) => {

    dataReport = JSON.parse(localStorage.getItem(`${nameOfReport}Report`));
    console.log("dataReport", dataReport, nameOfReport)

    // classy użyte do nagłówka i danych klienta
    // const tableThreeColumns = ["numberTSO", "yearTSO", "pageTSO", "pagesTSO"]
    // let readedClassesFromTable = convertClassesIntoOneString(tableThreeColumns)
    // console.log("readedClassesFromTable", readedClassesFromTable)

    // const findCustomerAndDate = `, #customerName, #researchAddress, #researchDate`
    // readedClassesFromTable += findCustomerAndDate
    // const nodeList = document.querySelectorAll(readedClassesFromTable)
    // console.log("nodeList", nodeList)

    // element 1 - numberTSO
    // nodeList[0].value = dataReport.numberTSO

    // element 2 - year
    // nodeList[1].value = dataReport.year

    // element 3 - page
    // nodeList[2].value = dataReport.page

    // element 4 - pages
    // nodeList[3].value = dataReport.pages

    // element 5 - customer
    // nodeList[4].rows = 1
    // let myRegExp = /\n/ig
    // let ifTrue
    // do {
    //     ifTrue = myRegExp.test(dataReport.customer)
    //     if (!ifTrue) break
    //     nodeList[4].rows++
    // } while (ifTrue)

    // nodeList[4].value = dataReport.customer

    // element 6 - placesof 
    // nodeList[5].rows = 1
    // do {
    //     ifTrue = myRegExp.test(dataReport.placeOfMeasurings)
    //     if (!ifTrue) break
    //     nodeList[5].rows++
    // } while (ifTrue)

    // nodeList[5].value = dataReport.placeOfMeasurings

    // element 7 - date
    // nodeList[6].value = dataReport.dateOfMeasurings

    // element 8 - tables
    // dataReport.tables = nodeList[7].value
}


export const newTable = () => {

    const tabName = readTemporaryTableReportName()
    const localTabName = tabName.slice(1, tabName.length - 1)
    // console.log(localTabName)
    let dataReport = JSON.parse(localStorage.getItem(`${localTabName}Report`))
    // newTable(dataReport)
    // console.log("doc dataReport", dataReport)

    const borders = {
        top: {
            style: BorderStyle.THICK,
            size: convertMillimetersToTwip(0.1),
            color: "000000",
        },
        bottom: {
            style: BorderStyle.THICK,
            size: convertMillimetersToTwip(0.1),
            color: "000000",
        },
        left: {
            style: BorderStyle.THICK,
            size: convertMillimetersToTwip(0.1),
            color: "000000",
        },
        right: {
            style: BorderStyle.THICK,
            size: convertMillimetersToTwip(0.1),
            color: "000000",
        },
    };

    const tableTS = new docx.Table({
        alignment: AlignmentType.CENTER,
        verticalAlign: docx.VerticalAlign.CENTER,
        // columnWidths: [convertMillimetersToTwip(45),
        // convertMillimetersToTwip(80),
        // convertMillimetersToTwip(35)],
        rows: [new docx.TableRow({
            children: [
                new docx.TableCell({
                    borders,
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
                    borders,
                    verticalAlign: docx.VerticalAlign.CENTER,
                    width: {
                        size: convertMillimetersToTwip(80),
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({
                        style: "headerTxt",
                        text: `Sprawozdanie TSO/${dataReport.numberTSO}/${dataReport.year}`,
                    })
                    ],
                }),
                new docx.TableCell({
                    borders,
                    verticalAlign: docx.VerticalAlign.CENTER,
                    width: {
                        size: convertMillimetersToTwip(35),
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({
                        style: "headerTxt",
                        text: `Strona/Stron: ${dataReport.page}/${dataReport.pages}`,
                    })
                    ],
                }),
            ],


        }

        )
        ]
    })

    const paragraph_title = new docx.Paragraph({
        text: "BADANIA OŚWIETLENIA ELEKTRYCZNEGO",
        alignment: AlignmentType.CENTER,
    })

    const tableRowNumbers = new docx.TableRow({
        children: [
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(6),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "1",
                })
                ],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(65),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "2",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(45),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "3",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(14),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "4",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "5",
                })
                ],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "6",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "7",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "tableHeaderNumbers",
                    text: "8",
                })],
            }),
        ],
    })

    const tableHeader1Text = new docx.TableRow({
        children: [
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(6),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Lp.",
                })
                ],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(65),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Miejsce pomiarów (według schematu)",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(45),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: `Zmierzone natężenie oświetlenia elektrycznego E[lx]`,
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(24),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Eksploatacyjne natężenie oświetlenia elektrycznego Em[lx]",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(24),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Równomierność oświetlenia elektrycznego Uo",
                })
                ],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Zgodność z PN",
                })],
            }),
        ],
    })

    const tableHeader2Text = new docx.TableRow({
        children: [
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "z pomiarów",
                })
                ],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "wg normy",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "z pomiarów",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "wg normy",
                })],
            }),
        ],
    })

    const doc = new docx.Document({
        // pageOrientation: docx.PageOrientation.LANDSCAPE,
        // pageOrientation: LANDSCAPE,
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
                    name: "Naglowek",
                    run: {
                        // italics: true,
                        size: "9pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    },
                },
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
                }],
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
                            top: "10mm",
                            right: "10mm",
                            bottom: "10mm",
                            left: "10mm",
                        }
                    },
                },
                children: [
                    tableTS,
                    paragraph_title,
                    new docx.Table({
                        alignment: AlignmentType.CENTER,
                        columnWidths: [convertMillimetersToTwip(6), convertMillimetersToTwip(65), convertMillimetersToTwip(45), convertMillimetersToTwip(14), convertMillimetersToTwip(12), convertMillimetersToTwip(11), convertMillimetersToTwip(11), convertMillimetersToTwip(12)],
                        rows: [
                            tableHeader1Text,
                            tableHeader2Text,
                            tableRowNumbers,
                        ],
                    }),
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


// KKKKKKKKKKKKKKK

export const exportWordDocument = () => {
    // console.log("nastąpiła próba wysłania dokumentu WORD")

    const paragraph_title = new docx.Paragraph({
        text: "BADANIA OŚWIETLENIA ELEKTRYCZNEGO",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
    })

    const paragraph2 = new docx.Paragraph({
        text: "Tu powinno coś być w niedługim czasie :)",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.LEFT,
    });

    const paragraphEmpty = new docx.Paragraph({
        text: "",
        style: "numbers",
    });

    const doc = new docx.Document({
        styles: {
            paragraphStyles: [
                {
                    id: "numbers",
                    name: "Numerki",
                    // basedOn: "Normal",
                    // next: "Normal",
                    run: {
                        // bold: true,
                        // italics: true,
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    }
                },
                {
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: "999999",
                        italics: true,
                    },
                    paragraph: {
                        indent: {
                            left: convertInchesToTwip(0.5),
                        },
                        spacing: {
                            line: 276,
                        },
                    },
                }]
        },
        sections: [
            {
                properties: {},
                children: [
                    paragraph_title,
                    new docx.Paragraph({
                        text: "TESTUJMY...",
                        style: "numbers",
                    }),
                ]
            }
        ]
    });

    docx.Packer.toBlob(doc).then((blob) => {
        console.log("blob", blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}

function generate() {
    const doc = new docx.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx.Paragraph({
                        style: "numbers",
                        children: [
                            new docx.TextRun("Badania oświetlenia elektrycznego"),
                            new docx.TextRun({
                                text: "Foo Bar",
                                bold: true
                            }),
                            new docx.TextRun({
                                text: "\tGithub is the best",
                                bold: true
                            })
                        ]
                    })
                ]
            }
        ]
    });

    docx.Packer.toBlob(doc).then((blob) => {
        console.log("blob", blob);
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
    });
}


