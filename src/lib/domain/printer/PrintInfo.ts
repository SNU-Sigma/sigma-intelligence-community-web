import { writable } from 'svelte/store'
import { PrintAPIImpl } from '../../infrastructure/sigma-api/PrintAPIImpl'
import type { ListedPrinterReservationDto } from './model/ListedPrinterReservationDto'
import { cubiconPrinter, guider2Printer } from './model/Printer'

export const createPrinterStore = (printerId: number) => {
    const { subscribe, set } = writable<Array<ListedPrinterReservationDto>>([])

    const fetchPrinterReservations = async (selectedDate: Date) => {
        set([])
        const printerReservations = await PrintAPIImpl.fetchPrinterReservations(
            printerId,
            selectedDate,
        )

        set(printerReservations)
    }

    return {
        subscribe,
        fetchPrinterReservations,
    }
}

export const cubiconPrinterInfo = createPrinterStore(cubiconPrinter.id)
export const guider2PrinterInfo = createPrinterStore(guider2Printer.id)
