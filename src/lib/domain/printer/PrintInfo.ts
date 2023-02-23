import { writable } from 'svelte/store'
import { PrintAPIImpl } from '../../infrastructure/sigma-api/PrintAPIImpl'
import type { ListedPrinterReservationDto } from './model/ListedPrinterReservationDto'

export const createPrinterStore = (printerId: number) => {
    const { subscribe, set } = writable<Array<ListedPrinterReservationDto>>([])

    const fetchPrinterReservations = async (selectedDate: Date) => {
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

export const cubiconPrinterInfo = createPrinterStore(1)
export const guider2PrinterInfo = createPrinterStore(2)
