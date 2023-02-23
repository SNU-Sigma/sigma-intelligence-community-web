import axios from 'axios'

export type CreateReservationDto = {
    printerId: number
    startDateTime: Date
    usageTime: number
    reason: string
}

export type ListedPrinterReservationDto = {
    id: number
    printerId: number
    requestStartTime: string
    requestEndTime: string
    reason: string
    user: {
        email: string
        profile: {
            id: number
            name: string
        }
    }
    isMine: boolean
}

export const PrintAPIImpl = {
    updatePrintSchedule: async (
        printReservation: CreateReservationDto,
    ): Promise<void> => {
        await axios.post('/printer-reservation/create', printReservation)
    },
    fetchPrinterReservations: async (
        printerId: number,
        date: Date,
    ): Promise<Array<ListedPrinterReservationDto>> => {
        const { data } = await axios.get(
            `/printer-reservation/reservations/${printerId}?date=${date.toISOString()}`,
        )
        return data
    },
}
