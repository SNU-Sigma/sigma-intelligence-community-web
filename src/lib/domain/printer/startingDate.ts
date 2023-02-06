import { writable } from 'svelte/store'

export const newDate = (() => {
    const schedules: Date = new Date()
    const { subscribe, set } = writable(schedules)

    const makeNewDate = (
        year: number,
        month: number,
        date: number,
        day: number,
    ) => {
        const dateCreator = new Date(year, month, date, day, 0, 0, 0)
        set(dateCreator)
    }
    return {
        subscribe,
        makeNewDate,
    }
})()
