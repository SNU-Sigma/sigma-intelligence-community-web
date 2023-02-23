export type Printer = {
    id: number
    label: string
}

export const cubiconPrinter: Printer = {
    id: 1,
    label: 'Cubicon 프린터',
}

export const guider2Printer: Printer = {
    id: 2,
    label: 'Guider2 프린터',
}

export const allPrinters: Array<Printer> = [cubiconPrinter, guider2Printer]
