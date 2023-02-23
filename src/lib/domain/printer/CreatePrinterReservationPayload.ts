import { addHours, startOfDay } from 'date-fns'
import { writable } from 'svelte/store'
import { cubiconPrinter, type Printer } from './model/Printer'

export const CreatePrinterReservationPayload = (() => {
    const { subscribe, set } = writable({
        printerId: cubiconPrinter.id,
        startingDateTime: new Date(0, 0, 0, 0, 0, 0, 0),
    })

    const setPayload = (
        printerId: Printer['id'],
        selectedDate: Date,
        hour: number,
    ) => {
        const selectedDateWithoutTime = startOfDay(selectedDate)
        set({
            printerId,
            startingDateTime: addHours(selectedDateWithoutTime, hour),
        })
    }

    return {
        subscribe,
        setPayload,
    }
})()
