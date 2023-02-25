import axios from 'axios'
import type { CreateReservationDto } from '../../domain/printer/model/CreateReservationDto'
import type { ListedPrinterReservationDto } from '../../domain/printer/model/ListedPrinterReservationDto'

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
