import type { CreateReservationDto } from '../../infrastructure/sigma-api/PrintAPIImpl'

export type PrinterReservationDto = {
    userId: number
    printerInfo?: CreateReservationDto
}
