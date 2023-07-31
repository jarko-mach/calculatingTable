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
    convertInchesToTwip,
    WidthType,
    PageOrientation
} from "../docx/build/index.js"

// START

export const newTable = () => {

    // console.log(12, "convertMillimetersToTwip", convertMillimetersToTwip(12))
    // console.log(65, "convertMillimetersToTwip", convertMillimetersToTwip(65))
    const paragraph_title = new docx.Paragraph({
        text: "BADANIA OŚWIETLENIA ELEKTRYCZNEGO",
        heading: HeadingLevel.HEADING_2,
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
                    style: "numbers",
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
                    style: "numbers",
                    text: "2",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(45),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "numbers",
                    text: "3",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(14),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "numbers",
                    text: "4",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "numbers",
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
                    style: "numbers",
                    text: "6",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "numbers",
                    text: "7",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(12),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "numbers",
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
                    text: "Zmierzone natężenie oświetlenia elektrycznego E [lx]",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(26),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "Eksploatacyjne natężenie oświetlenia elektrycznego Em [lx]",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(26),
                    type: docx.WidthType.DXA,
                },
                columnSpan: 2,
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
                    size: convertMillimetersToTwip(14),
                    type: docx.WidthType.DXA,
                },
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
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "wg normy",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
                children: [new docx.Paragraph({
                    style: "headerTxt",
                    text: "z pomiarów",
                })],
            }),
            new docx.TableCell({
                width: {
                    size: convertMillimetersToTwip(11),
                    type: docx.WidthType.DXA,
                },
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
                    id: "numbers",
                    name: "Numerki",
                    run: {
                        italics: true,
                        size: "9pt",
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
                        size: "10pt",
                        font: "Calibri",
                    },
                    paragraph: {
                        alignment: docx.AlignmentType.CENTER,
                    },
                },],
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
                    paragraph_title,

                    new docx.Table({
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


