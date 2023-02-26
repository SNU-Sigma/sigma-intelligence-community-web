import type { User } from '../../common/model/User'

export type ListedPrinterReservationDto = {
    id: number
    printerId: number
    requestStartTime: string
    requestEndTime: string
    reason: string
    user: User
    isMine: boolean
}
