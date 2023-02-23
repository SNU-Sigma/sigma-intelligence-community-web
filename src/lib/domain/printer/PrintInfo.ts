import {
    PrintAPIImpl,
    type CreateReservationDto,
} from '../../infrastructure/sigma-api/PrintAPIImpl'
import { writable } from 'svelte/store'

export type PrinterReservationDto = {
    userId: number
    printerInfo?: CreateReservationDto
}

export type Profile = {
    name: string
}

export type UserInformation = {
    email: string
    profile: Profile
}

export type PrinterReservationSchedule = {
    id: number
    isMine: boolean
    printerId: number
    reason: string
    requestEndTime: string
    requestStartTime: string
    user: UserInformation
}

export const createPrinterStore = (printerId: number) => {
    const { subscribe, set } = writable<Array<PrinterReservationSchedule>>([])

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
