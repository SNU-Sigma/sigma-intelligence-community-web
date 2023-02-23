import { addHours, startOfDay } from 'date-fns'
import { writable } from 'svelte/store'
import { cubiconPrinter } from './model/Printer'

export const StartingDateTime = (() => {
    const { subscribe, set } = writable(new Date(0, 0, 0, 0, 0, 0, 0))

    const setStartingTime = (selectedDate: Date, hour: number) => {
        const selectedDateWithoutTime = startOfDay(selectedDate)
        set(addHours(selectedDateWithoutTime, hour))
    }

    return {
        subscribe,
        setStartingTime,
    }
})()

export const printerId = (() => {
    const { subscribe, set } = writable(cubiconPrinter.id)
    const setPrinterId = (id: number) => {
        set(id)
    }
    return {
        subscribe,
        setPrinterId,
    }
})()
