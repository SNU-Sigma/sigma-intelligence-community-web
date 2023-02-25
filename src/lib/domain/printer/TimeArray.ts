import { getHours, isSameDay } from 'date-fns'
import { derived, type Readable } from 'svelte/store'
import type { CellPrinterReservation } from '../../ui/printer/model/CellPrinterReservation'
import type { ListedPrinterReservationDto } from './model/ListedPrinterReservationDto'
import type { Printer } from './model/Printer'

export const deriveTimeArray = ({
    selectedDate,
    printer,
    printerStore,
}: {
    selectedDate: Date
    printer: Printer
    printerStore: Readable<Array<ListedPrinterReservationDto>>
}): {
    timeArrayStore: Readable<Array<CellPrinterReservation>>
    printer: Printer
} => {
    const timeArrayStore = derived(printerStore, (printerReservationList) => {
        return printerReservationList.flatMap(
            (printerReservation): Array<CellPrinterReservation> => {
                const { requestStartTime, requestEndTime } = printerReservation
                const requestStartDateTime = new Date(requestStartTime)
                const requestEndDateTime = new Date(requestEndTime)
                const startHours = isSameDay(requestStartDateTime, selectedDate)
                    ? getHours(new Date(requestStartTime))
                    : 0
                const endHours = isSameDay(requestEndDateTime, selectedDate)
                    ? getHours(new Date(requestEndTime))
                    : 24
                return Array.from(
                    { length: endHours - startHours },
                    (_, index) => {
                        const startingHour = startHours + index
                        return {
                            startingHour,
                            originalReservation: printerReservation,
                            isTop: index === 0,
                        }
                    },
                )
            },
        )
    })
    return {
        printer,
        timeArrayStore,
    }
}
