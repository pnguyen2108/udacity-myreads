export interface IIndustryIdentifiers {
    type : string,
    identifier: string
}

export interface IImageLinks {
    smallThumbnail : string,
    thumbnail : string
}

export interface IPanelizationSummary {
    containsEpubBubbles : boolean,
    containsImageBubbles: boolean
}

export interface IReadingModes {
    text: string,
    image : string
}

export interface IBook {
    title: string,
    subtitle: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    description: string,
    industryIdentifiers: IIndustryIdentifiers[],
    readingModes: IReadingModes,
    pageCount: number,
    printType: string,
    categories: string[],
    averageRating: number,
    ratingsCount: number,
    maturityRating: string,
    allowAnonLogging: boolean,
    contentVersion: string,
    panelizationSummary:  IPanelizationSummary,
    imageLinks: IImageLinks,
    language:string,
    previewLink: string,
    infoLink: string
    canonicalVolumeLink: string,
    id: string,
    shelf: string
}