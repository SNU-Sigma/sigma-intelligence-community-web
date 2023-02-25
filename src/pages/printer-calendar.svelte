<script lang="ts">
    import { goto } from '@roxi/routify'
    import {
        addDays,
        addWeeks,
        getHours,
        isEqual,
        startOfDay,
        startOfWeek,
    } from 'date-fns'
    import { onMount } from 'svelte'
    import { CreatePrinterReservationPayload } from '../lib/domain/printer/CreatePrinterReservationPayload'
    import {
        cubiconPrinterInfo,
        guider2PrinterInfo,
    } from '../lib/domain/printer/PrintInfo'
    import axios from 'axios'
    import { toastStore } from '@skeletonlabs/skeleton'
    import {
        cubiconPrinter,
        guider2Printer,
        type Printer,
    } from '../lib/domain/printer/model/Printer'

    const allStartingHours = Array.from({ length: 24 }, (_, index) => index)

    let weekOffset = 0
    let selectedDate = startOfDay(new Date())

    let cubiconTimeArray: Array<number> = []
    let topCubiconTimeArray: Array<number> = []
    let guider2TimeArray: Array<number> = []
    let topGuider2TimeArray: Array<number> = []

    $: displayedWeekDate = addWeeks(new Date(), weekOffset)

    const getTimeLabel = (hour: number): string => {
        const hourRepresentation = (() => {
            if (hour % 12 === 0) {
                return 12
            }
            return hour % 12
        })()
        const suffix = (() => {
            if (hour < 12) {
                return 'AM'
            }
            return 'PM'
        })()
        return hourRepresentation.toString().padStart(2, '0') + suffix
    }

    const weekArrayCreator = (date: Date) => {
        let weekArray: Array<Date> = []
        let i = 0
        const startDate = startOfWeek(date)
        for (i = 0; i < 7; i++) {
            weekArray.push(addDays(startDate, i))
        }
        i = 0
        return weekArray
    }

    const incrementWeekOffset = () => {
        weekOffset = weekOffset + 1
    }
    const decrementWeekOffset = () => {
        weekOffset = weekOffset - 1
    }

    const handleSelectedDateChange = async (date: Date) => {
        selectedDate = date
        await refetchPrinterReservations()
    }

    const setPayloadForCreation = async (
        printerId: Printer['id'],
        hour: number,
    ) => {
        CreatePrinterReservationPayload.setPayload(
            printerId,
            selectedDate,
            hour,
        )
    }

    const getCubiconHours = () => {
        const temp: Array<[number, number]> = $cubiconPrinterInfo.map(
            ({ requestStartTime, requestEndTime }) => {
                const startHours = getHours(new Date(requestStartTime))
                const endHours = getHours(new Date(requestEndTime))
                return [startHours, endHours]
            },
        )
        cubiconTimeArray = []
        topCubiconTimeArray = []
        temp.forEach(([startHours, endHours]) => {
            for (let j = startHours; j < endHours; j++) {
                if (j === startHours) {
                    topCubiconTimeArray.push(j)
                }
                cubiconTimeArray.push(j)
            }
        })
    }

    const getGuider2Hours = () => {
        const temp: Array<[number, number]> = $guider2PrinterInfo.map(
            ({ requestStartTime, requestEndTime }) => {
                const startHours = getHours(new Date(requestStartTime))
                const endHours = getHours(new Date(requestEndTime))
                return [startHours, endHours]
            },
        )
        guider2TimeArray = []
        topGuider2TimeArray = []
        temp.forEach(([startHours, endHours]) => {
            for (let j = startHours; j < endHours; j++) {
                if (j === startHours) {
                    topGuider2TimeArray.push(j)
                }
                guider2TimeArray.push(j)
            }
        })
    }

    const deleteSchedule = async (id: number) => {
        await axios.delete(`/printer-reservation/reservations/${id}`)
        toastStore.trigger({
            message: '프린터 삭제에 성공했습니다.',
            preset: 'success',
        })
    }

    const refetchPrinterReservations = async () => {
        await Promise.all([
            cubiconPrinterInfo.fetchPrinterReservations(selectedDate),
            guider2PrinterInfo.fetchPrinterReservations(selectedDate),
        ])
        getCubiconHours()
        getGuider2Hours()
    }

    onMount(() => {
        refetchPrinterReservations()
    })
</script>

<div
    class="absolute top-1 left-1 right-1 flex flex-col rounded-md bg-primary-100 pb-2"
>
    <h2 class="relative left-1 font-bold">SIGMA 3D PRINTER</h2>
    <h2 class="relative left-1 text-base">
        {displayedWeekDate.getFullYear()}년 {displayedWeekDate.getMonth() + 1}월
    </h2>
    <div class="flex-row space-x-2 space-y-0.5 bg-inherit">
        <button on:click={decrementWeekOffset} class="relative left-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
            >
                <path
                    fill-rule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
        {#each weekArrayCreator(displayedWeekDate) as day}
            <button
                class={isEqual(selectedDate, day)
                    ? 'btn variant-filled-primary rounded-full px-2 py-1 text-xs'
                    : 'btn variant-filled-secondary rounded-full px-2 py-1 text-xs'}
                on:click={() => {
                    handleSelectedDateChange(day)
                }}
            >
                {#if day.getDate() < 10}
                    0{day.getDate()}
                {:else}
                    {day.getDate()}
                {/if}
                {day.toLocaleString('ko-KR', { weekday: 'short' })}
            </button>
        {/each}
        <button on:click={incrementWeekOffset} class="static right-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5"
            >
                <path
                    fill-rule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>
</div>

<div class="absolute top-28 left-6 flex flex-row space-x-12">
    <span class="text-sm">Time</span>
    <span class="text-sm">Cubicon 프린터</span>
    <span class="text-sm">Guider2 프린터</span>
</div>

<div
    class="absolute top-36 flex h-[calc(100vh-12rem)] max-h-screen flex-col overflow-y-scroll overscroll-contain"
>
    {#each allStartingHours as time}
        <div class="flex flex-row">
            <div class="px-2">
                {getTimeLabel(time)}
            </div>
            <button
                class="h-20 w-40 border-2 border-gray-300 bg-gray-200 px-2 text-black"
                class:border-0={cubiconTimeArray.includes(time)}
                class:bg-red-400={cubiconTimeArray.includes(time)}
                on:click={() => {
                    if (!cubiconTimeArray.includes(time)) {
                        setPayloadForCreation(cubiconPrinter.id, time)
                        $goto('/printer')
                    } else {
                        window.alert('삭제하시겠습니까?')
                        deleteSchedule(
                            $cubiconPrinterInfo[
                                topCubiconTimeArray.indexOf(time)
                            ]?.id ?? 0,
                        )
                    }
                }}
            >
                {#if topCubiconTimeArray.includes(time)}
                    <p class="truncate">
                        {$cubiconPrinterInfo[topCubiconTimeArray.indexOf(time)]
                            ?.reason}
                    </p>
                    <span class="text-xs">
                        {$cubiconPrinterInfo[topCubiconTimeArray.indexOf(time)]
                            ?.user.profile.name}
                    </span>
                {/if}
            </button>
            <button
                class="h-20 w-40 border-2 border-gray-300 bg-gray-200 px-2 text-black"
                class:border-0={guider2TimeArray.includes(time)}
                class:bg-blue-400={guider2TimeArray.includes(time)}
                on:click={() => {
                    if (!guider2TimeArray.includes(time)) {
                        setPayloadForCreation(guider2Printer.id, time)
                        $goto('/printer')
                    } else {
                        window.alert('삭제하시겠습니까?')
                        deleteSchedule(
                            $guider2PrinterInfo[
                                topCubiconTimeArray.indexOf(time)
                            ]?.id ?? 0,
                        )
                    }
                }}
            >
                {#if topGuider2TimeArray.includes(time)}
                    <p class="truncate">
                        {$guider2PrinterInfo[topGuider2TimeArray.indexOf(time)]
                            ?.reason}
                    </p>
                    <span class="text-xs">
                        {$guider2PrinterInfo[topGuider2TimeArray.indexOf(time)]
                            ?.user.profile.name}
                    </span>
                {/if}
            </button>
        </div>
    {/each}
</div>
