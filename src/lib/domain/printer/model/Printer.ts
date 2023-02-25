export type Printer = {
    id: typeof PrinterId[keyof typeof PrinterId]
    label: string
}

export const PrinterId = {
    cubicon: 1,
    guider: 2,
} as const

const cubiconPrinter: Printer = {
    id: PrinterId.cubicon,
    label: 'Cubicon 프린터',
}

const guiderPrinter: Printer = {
    id: PrinterId.guider,
    label: 'Guider2 프린터',
}

export const allPrinters: Array<Printer> = [cubiconPrinter, guiderPrinter]
