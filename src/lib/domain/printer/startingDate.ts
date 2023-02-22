import { writable } from 'svelte/store'

export const newDate = (() => {
    const schedules: Date = new Date(0, 0, 0, 0, 0, 0, 0)
    const { subscribe, set } = writable(schedules)

    const makeNewDate = (
        year: number,
        month: number,
        date: number,
        hour: number,
    ) => {
        const dateCreator = new Date(year, month, date, hour, 0, 0, 0)
        set(dateCreator)
    }
    return {
        subscribe,
        makeNewDate,
    }
})()

export const printerId = (() => {
    const printerId = 1
    const { subscribe, set } = writable(printerId)
    const setPrinterId = (id: number) => {
        set(id)
    }
    return {
        subscribe,
        setPrinterId,
    }
})()
