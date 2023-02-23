import type { CreateReservationDto } from '../../infrastructure/sigma-api/PrintAPIImpl'
import { writable } from 'svelte/store'
import axios from 'axios'

export type PrinterReservationDto = {
    userId: number
    printerInfo?: CreateReservationDto
}

export type Profile = {
    id: number
    name: string
}

export type UserInformation = {
    email: string
    id: number
    profile: Profile
    profileId: number
    role: string
    userAuthId: number
}

export type PrinterReservationSchedule = {
    id: number
    isMine: boolean
    printerId: number
    reason: string
    requestEndTime: string
    requestStartTime: string
    user: UserInformation
    userId: number
}

export const createPrinterStore = (printerId: number) => {
    const { subscribe, set } = writable<Array<PrinterReservationSchedule>>([])

    const fetchPrinterReservations = async (selectedDate: Date) => {
        const printerReservations: Array<PrinterReservationSchedule> =
            await axios
                .get(
                    `/printer-reservation/reservations/${printerId}?date=${selectedDate.toISOString()}`,
                )
                .then(({ data }) => data)

        set(printerReservations)
    }

    return {
        subscribe,
        fetchPrinterReservations,
    }
}

export const cubiconPrinterInfo = createPrinterStore(1)

export const guider2PrinterInfo = createPrinterStore(2)
