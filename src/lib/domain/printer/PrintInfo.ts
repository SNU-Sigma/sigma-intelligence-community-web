import type { CreateReservationDto } from '../../infrastructure/sigma-api/PrintAPIImpl'
import { writable } from 'svelte/store'
import axios from 'axios'
import { addHours } from 'date-fns'

export type PrinterReservationDto = {
    userId: number
    printerInfo?: CreateReservationDto
}

export type Profile = {
    id: number
    name: string
}

export type UserInformation = {
    email: string
    id: number
    profile: Profile
    profileId: number
    role: string
    userAuthId: number
}

export type PrinterReservationSchedule = {
    id: number
    isMine: boolean
    printerId: number
    reason: string
    requestEndTime: string
    requestStartTime: string
    user: UserInformation
    userId: number
}

const setHoursToZero = (printDate: Date) => {
    let tempDate = printDate
    tempDate.setHours(0, 0, 0, 0)
    tempDate = addHours(tempDate, -9)
    return tempDate
}

export const cubiconPrinterInfo = (() => {
    const cubiconPrintSchedule: Array<PrinterReservationSchedule> = []
    let tempData: Array<PrinterReservationSchedule> = []
    const { subscribe, update } = writable(cubiconPrintSchedule)

    const getCubiconPrintSchedule = async (printDate: Date) => {
        await axios
            .get(
                `/printer-reservation/reservations/1?date=${setHoursToZero(
                    printDate,
                ).toString()}`,
            )
            .then((response) => {
                tempData = response.data
            })
        update((datas) => {
            datas = tempData
            return datas
        })
    }
    return {
        subscribe,
        getCubiconPrintSchedule,
    }
})()

export const guider2PrinterInfo = (() => {
    const guider2PrintSchedule: Array<PrinterReservationSchedule> = []
    let tempData: Array<PrinterReservationSchedule> = []
    const { subscribe, update } = writable(guider2PrintSchedule)

    const getGuider2PrintSchedule = async (printDate: Date) => {
        await axios
            .get(
                `/printer-reservation/reservations/2?date=${setHoursToZero(
                    printDate,
                ).toString()}`,
            )
            .then((response) => {
                tempData = response.data
            })
        update((datas) => {
            datas = tempData
            return datas
        })
    }
    return {
        subscribe,
        getGuider2PrintSchedule,
    }
})()
