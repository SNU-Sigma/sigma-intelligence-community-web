import axios from 'axios'

export type CreateReservationDto = {
    printerId: number
    startDateTime: Date
    usageTime: number
    reason: string
}

export const PrintAPIImpl = {
    UpdatePrintSchedule: async (
        printReservation: CreateReservationDto,
    ): Promise<void> => {
        await axios.post('/printer-reservation/create', {
            printReservation,
        })
    },
}
