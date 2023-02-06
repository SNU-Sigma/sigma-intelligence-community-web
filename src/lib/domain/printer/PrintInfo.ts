import { localStorageStore } from '@skeletonlabs/skeleton'
import type { CreateReservationDto } from '../../infrastructure/sigma-api/PrintAPIImpl'

export type PrinterReservationDto = {
    userId: number
    printerInfo?: CreateReservationDto
}

export const PrintInfo$ = (() => {
    const { subscribe, update } = localStorageStore<PrinterReservationDto>(
        'printInfo',
        {
            userId: 0,
            printerInfo: {
                printerId: 0,
                startDateTime: new Date(2023, 1, 29, 13, 11, 10),
                usageTime: 3,
                reason: 'testing',
            },
        },
    )

    const setNewUserSchedule = (
        UserId: number,
        UserPrintInfo: CreateReservationDto,
    ) => {
        const newPrintInfo: PrinterReservationDto = {
            userId: UserId,
            printerInfo: UserPrintInfo,
        }
        update((prev) => ({
            ...prev,
            newPrintInfo,
        }))
    }

    return {
        subscribe,
        setNewUserSchedule,
    }
})()
