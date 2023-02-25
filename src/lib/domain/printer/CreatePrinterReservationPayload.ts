import { addHours, startOfDay, startOfHour } from 'date-fns'
import { writable } from 'svelte/store'
import { allPrinters, type Printer } from './model/Printer'

export const CreatePrinterReservationPayload = (() => {
    const { subscribe, update } = writable({
        printerId: allPrinters[0]?.id ?? 0,
        startingDateTime: startOfHour(new Date()),
    })

    const setDate = (selectedDate: Date) => {
        update(({ ...rest }) => {
            return {
                ...rest,
                startingDateTime: startOfDay(selectedDate),
            }
        })
    }

    const setPrinterAndHour = (printerId: Printer['id'], hour: number) => {
        update(({ startingDateTime, ...rest }) => {
            return {
                ...rest,
                printerId,
                startingDateTime: addHours(startingDateTime, hour),
            }
        })
    }

    return {
        subscribe,
        setDate,
        setPrinterAndHour,
    }
})()
