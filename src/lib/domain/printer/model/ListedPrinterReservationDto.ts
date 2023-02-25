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
