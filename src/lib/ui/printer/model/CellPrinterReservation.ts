import type { ListedPrinterReservationDto } from '../../../domain/printer/model/ListedPrinterReservationDto'

export type CellPrinterReservation = {
    startingHour: number
    isTop: boolean
    originalReservation: ListedPrinterReservationDto
}
