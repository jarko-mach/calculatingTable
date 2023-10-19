"use strict";

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
    BorderStyle,
    TableBorders,
    Border,
    UnderlineType, TextRun
} from "../../../../docx/build/index.js"
// "../../docx/build/index.js"

import { tempInformations, readTemporaryReportName } from "../../../miscellaneous/misc.js"

// START

export const exportnewTable5a_Word = () => {
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
                            style: "table5aHeaderTxt",
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
                        style: "table5aHeaderTxt",
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
                        style: "table5aHeaderTxt",
                        text: `Strona/Stron: 1/${dataReport.allPages}`,
                    })
                    ],
                }),
            ],
        })]
    })


    const paragraphTabela1 = new docx.Paragraph({
        style: "table5a_number1",
        text: "Tabela nr 1",
        alignment: AlignmentType.LEFT,
        pageBreakBefore: true,
    })

    const paragraphBadania = new docx.Paragraph({
        style: "table5a_title",
        text: "BADANIA OŚWIETLENIA ELEKTRYCZNEGO",
        alignment: AlignmentType.CENTER,
    })

    const customerTable = new docx.Table({
        // alignment: AlignmentType.LEFT,
        // verticalAlign: docx.VerticalAlign.CENTER,
        borders: TableBorders.NONE,
        rows: [
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: convertMillimetersToTwip(45),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
                                text: "Nazwa i adres Klienta:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: convertMillimetersToTwip(125),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
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
                            size: convertMillimetersToTwip(45),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
                                text: "Miejsce wykonania badań:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: convertMillimetersToTwip(125),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
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
                            size: convertMillimetersToTwip(45),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
                                text: "Data wykonania badań:",
                            }),
                        ],
                    }),
                    new docx.TableCell({
                        width: {
                            size: convertMillimetersToTwip(125),
                            type: docx.WidthType.DXA,
                        },
                        children: [
                            new docx.Paragraph({
                                style: "table5a_customer",
                                children: [
                                    new docx.TextRun({
                                        text: `${dataReport.researchDate}`,
                                        bold: true,
                                    })
                                ],
                            }),
                        ],
                    }),]
            }),
        ]
    })

    const tableRowNumbers = new docx.TableRow({
        children: [
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(6),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "1",
                })
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(65),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "2",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(45),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "3",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(14),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "4",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "5",
                })
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "6",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "7",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "table5aHeaderNumbers",
                    text: "8",
                })],
            }),
        ],
    })

    const tableHeader1Text = new docx.TableRow({
        children: [
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(6),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "Lp.",
                })
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(65),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "Miejsce pomiarów (według schematu)",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(45),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [
                    new docx.Paragraph({
                        style: "table5aHeaderTxt",
                        children: [
                            new docx.TextRun({
                                text: "Zmierzone natężenie oświetlenia elektrycznego ",
                            }),
                            new docx.TextRun({
                                text: "E",
                                italics: true,
                            }),
                            new docx.TextRun({
                                text: " [lx]",
                            })
                        ]
                    }),
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(24),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    children: [
                        new docx.TextRun({
                            text: "Eksploatacyjne natężenie oświetlenia elektrycznego ",
                        }),
                        new docx.TextRun({
                            text: "Ē",
                            italics: true,
                        }),
                        new docx.TextRun({
                            text: "m",
                            italics: true,
                            subScript: true,
                        }),
                        new docx.TextRun({
                            text: " [lx]",
                        })
                    ],

                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(24),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    children: [
                        new docx.TextRun({
                            text: "Równomierność oświetlenia elektrycznego ",
                        }),
                        new docx.TextRun({
                            text: "U",
                            italics: true,
                        }),
                        new docx.TextRun({
                            text: "o",
                            italics: true,
                            subScript: true,
                        })
                    ],
                })
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                rowSpan: 2,
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "Zgodność z PN",
                })],
            }),
        ],
    })

    const tableHeader2Text = new docx.TableRow({
        children: [
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "z pomiarów",
                })
                ],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "wg normy",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "z pomiarów",
                })],
            }),
            new docx.TableCell({
                borders: {
                    top: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    bottom: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                    right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                },
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                verticalAlign: docx.VerticalAlign.CENTER,
                children: [new docx.Paragraph({
                    style: "table5aHeaderTxt",
                    text: "wg normy",
                })],
            }),
        ],
    })

    const removeFalse = (arg) => {
        let localString1 = ""
        let localString2 = arg
        let foundIndex = localString2.indexOf("false")
        // jeżeli do wyniku dopisano false, to ten wynik powinien byc podkreslony, jest błędny i nie spełnia normy PN
        if (foundIndex !== -1) {
            localString1 = `${localString2.slice(0, foundIndex)}`
        } else { localString1 = localString2 }
        return localString1
    }

    const setUnderline = (arg) => {
        let localStyle = ""
        let foundIndex = arg.indexOf("false")
        // jeżeli do wyniku dopisano false, to ten wynik powinien byc podkreslony, jest błędny i nie spełnia normy PN
        if (foundIndex !== -1) { localStyle = "underln" }
        return localStyle
    }

    const addBottomBorder = (arg) => {
        // console.log("arg", arg)
        if (arg !== "rowThinLine") {
            return { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" }
        } else {
            return { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" }
        }
    }

    const doc = new docx.Document({
        // pageOrientation: docx.PageOrientation.LANDSCAPE,
        styles: {
            paragraphStyles: [
                {
                    id: "table5aHeaderNumbers",
                    name: "tab5a-Numerki",
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
                    id: "table5aHeaderTxt",
                    name: "tab5a-Nagłówek tabeli",
                    run: {
                        bold: true,
                        size: "8pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    },
                },
                {
                    id: "table5a_number1",
                    name: "tab5a-Tabela nr 1",
                    run: {
                        bold: true,
                        size: "11pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.RIGHT,
                        spacing: { line: 300, before: 650, after: 0 },
                    },
                },
                {
                    id: "table5a_title",
                    name: "tab5a-Tytuł",
                    run: {
                        bold: true,
                        size: "12pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                        spacing: { line: 300, before: 250, after: 320 },
                    },
                },
                {
                    id: "table5a_customer",
                    name: "tab5a-Klient",
                    run: {
                        // bold: true,
                        size: "11pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.LEFT,
                        spacing: { line: 300, before: 50, after: 32 },
                    },
                },
                {
                    id: "table5a_normalData",
                    name: "tab5a-treść",
                    run: {
                        // italics: true,
                        size: "9pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                        indent: { left: convertMillimetersToTwip(2), right: convertMillimetersToTwip(2) },
                        spacing: { line: 200, before: 20, after: 20 },
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
                            top: "20mm",
                            right: "10mm",
                            bottom: "10mm",
                            left: "20mm",
                        }
                    },
                },
                children: [

                    paragraphTabela1,
                    paragraphBadania,
                    customerTable,
                    new docx.Paragraph({
                        style: "table5aHeaderTxt",
                        text: "  ",
                    }),
                    new docx.Table({
                        // borders: TableBorders.NONE,
                        borders: docx.TableBorders.NONE,
                        alignment: AlignmentType.CENTER,
                        columnWidths: [convertMillimetersToTwip(6), convertMillimetersToTwip(65), convertMillimetersToTwip(45), convertMillimetersToTwip(14), convertMillimetersToTwip(12), convertMillimetersToTwip(11), convertMillimetersToTwip(11), convertMillimetersToTwip(12)],
                        rows: [
                            tableHeader1Text,
                            tableHeader2Text,
                            tableRowNumbers,
                            ...dataTable.map((element, index) => {
                                return new docx.TableRow({
                                    children: [
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.TOP,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(6),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                alignment: docx.AlignmentType.CENTER,
                                                children: [
                                                    new docx.TextRun({
                                                        text: element.info.numberLp,
                                                        bold: element.typeOfRow === "rowTextBold" ? true : false,
                                                    })
                                                ],
                                            })
                                            ],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.TOP,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(65),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                alignment: docx.AlignmentType.LEFT,
                                                children: [
                                                    new docx.TextRun({
                                                        text: element.info.place,
                                                        bold: element.typeOfRow === "rowTextBold" ? true : false,
                                                    })
                                                ],
                                            })],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.CENTER,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(45),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                text: element.info.measurings,
                                            })],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.BOTTOM,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(14),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                children: [
                                                    new docx.TextRun({
                                                        text: `${removeFalse(element.info.wynik1)}`,
                                                        style: `${setUnderline(element.info.wynik1)}`,
                                                    }),
                                                ]
                                            })],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.BOTTOM,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(12),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                text: element.info.norma1,
                                            })
                                            ],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.BOTTOM,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(11),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",

                                                children: [
                                                    new docx.TextRun({
                                                        text: `${removeFalse(element.info.wynik2)}`,
                                                        style: `${setUnderline(element.info.wynik2)}`,
                                                    }),
                                                ]
                                            })],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.BOTTOM,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(11),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                text: element.info.norma2,
                                            })],
                                        }),
                                        new docx.TableCell({
                                            verticalAlign: docx.VerticalAlign.BOTTOM,
                                            borders: {
                                                top: { style: BorderStyle.NONE, size: 0 * 8, color: "FFFFFF" },
                                                bottom: addBottomBorder(element.typeOfRow),
                                                left: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                                right: { style: BorderStyle.THICK, size: 0.7 * 8, color: "000000" },
                                            },
                                            width: {
                                                size: convertMillimetersToTwip(12),
                                                type: docx.WidthType.DXA,
                                            },
                                            children: [new docx.Paragraph({
                                                style: "table5a_normalData",
                                                text: element.info.compatibility,
                                            })],
                                        }),
                                    ],
                                })
                            })
                        ],
                    }),
                ],
            },
        ],
    });
    return doc
}

export const exportnewTable_Word = () => {
    let doc = exportnewTable5a_Word()
    docx.Packer.toBlob(doc).then((blob) => {
        // console.log("blob", blob);
        saveAs(blob, "tabelka5a.docx");
        // console.log("Document created successfully");
    });
}