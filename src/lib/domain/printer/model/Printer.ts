export type Printer = {
    id: typeof PrinterId[keyof typeof PrinterId]
    label: string
}

export const PrinterId = {
    cubicon: 1,
    guider2: 2,
} as const

const cubiconPrinter: Printer = {
    id: PrinterId.cubicon,
    label: 'Cubicon 프린터',
}

const guider2Printer: Printer = {
    id: PrinterId.guider2,
    label: 'Guider2 프린터',
}

export const allPrinters: Array<Printer> = [cubiconPrinter, guider2Printer]
