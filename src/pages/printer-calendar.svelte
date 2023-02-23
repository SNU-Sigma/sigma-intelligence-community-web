<script lang="ts">
    import { goto } from '@roxi/routify'
    import {
        addDays,
        addWeeks,
        isEqual,
        startOfDay,
        startOfWeek,
    } from 'date-fns'
    import { onMount } from 'svelte'
    import {
        StartingDateTime,
        printerId,
    } from '../lib/domain/printer/startingDate'
    import {
        cubiconPrinterInfo,
        guider2PrinterInfo,
    } from '../lib/domain/printer/PrintInfo'
    import axios from 'axios'
    import { toastStore } from '@skeletonlabs/skeleton'
    import {
        cubiconPrinter,
        guider2Printer,
    } from '../lib/domain/printer/model/Printer'

    const allStartingHours = Array.from({ length: 24 }, (_, index) => index)

    let weekOffset = 0
    let selectedDate = startOfDay(new Date())

    let cubiconTimeArray: Array<number> = []
    let topCubiconTimeArray: Array<number> = []
    let guider2TimeArray: Array<number> = []
    let topGuider2TimeArray: Array<number> = []

    $: displayedWeekDate = addWeeks(new Date(), weekOffset)

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

    const increment = () => [(weekOffset = weekOffset + 1)]
    const decrement = () => {
        weekOffset = weekOffset - 1
    }

    const handleSelectedDateChange = async (date: Date) => {
        selectedDate = date
        await refetchPrinterReservations()
    }

    const setTimePrinter = async (hour: number) => {
        StartingDateTime.setStartingTime(selectedDate, hour)
        $goto('/printer')
    }

    const getCubiconHours = () => {
        let temp: Array<number> = []
        for (let i = 0; i < $cubiconPrinterInfo.length; i++) {
            let startDateString = $cubiconPrinterInfo[
                i
            ]?.requestStartTime.slice(11, 13)
            let endDateString = $cubiconPrinterInfo[i]?.requestEndTime.slice(
                11,
                13,
            )
            let startHours,
                endHours = 0
            if (startDateString === undefined || endDateString === undefined) {
                break
            } else {
                startHours = parseInt(startDateString)
                endHours = parseInt(endDateString)
            }
            temp.push(startHours, endHours)
        }
        cubiconTimeArray = []
        topCubiconTimeArray = []
        for (let i = 0; i < temp.length; i += 2) {
            let j = 0
            for (
                j = ((temp[i] ?? 0) + 9) % 24;
                j < ((temp[i + 1] ?? 25) + 9) % 24;
                j++
            ) {
                if (j === ((temp[i] ?? 0) + 9) % 24 ?? 0) {
                    topCubiconTimeArray.push(j)
                }
                cubiconTimeArray.push(j)
            }
        }
        console.log(cubiconTimeArray, topCubiconTimeArray)
    }

    const getGuider2Hours = () => {
        let temp: Array<number> = []
        for (let i = 0; i < $guider2PrinterInfo.length; i++) {
            let startDateString = $guider2PrinterInfo[
                i
            ]?.requestStartTime.slice(11, 13)
            let endDateString = $guider2PrinterInfo[i]?.requestEndTime.slice(
                11,
                13,
            )
            let startHours,
                endHours = 0
            if (startDateString === undefined || endDateString === undefined) {
                break
            } else {
                startHours = parseInt(startDateString)
                endHours = parseInt(endDateString)
            }
            temp.push(startHours, endHours)
        }
        guider2TimeArray = []
        topGuider2TimeArray = []
        for (let i = 0; i < temp.length; i += 2) {
            let j = 0
            for (
                j = ((temp[i] ?? 0) + 9) % 24;
                j < ((temp[i + 1] ?? 25) + 9) % 24;
                j++
            ) {
                if (j === ((temp[i] ?? 0) + 9) % 24 ?? 0) {
                    topGuider2TimeArray.push(j)
                }
                guider2TimeArray.push(j)
            }
        }
        console.log(guider2TimeArray, topGuider2TimeArray)
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
        <button on:click={decrement} class="relative left-0">
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
        <button on:click={increment} class="static right-0">
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
        <div class="relative left-0 flex flex-row space-x-0">
            {#if time <= 12}
                {#if time < 10}
                    0{time}AM
                {:else}
                    {time}AM
                {/if}
            {:else if time - 12 < 10}
                0{time - 12}PM
            {:else}
                {time - 12}PM
            {/if}

            <button
                class={cubiconTimeArray.includes(time)
                    ? 'h-20 w-40 border-gray-300 bg-red-400 text-black'
                    : 'h-20 w-40 border-2 border-gray-300 bg-gray-200 text-black'}
                on:click={() => {
                    if (!cubiconTimeArray.includes(time)) {
                        setTimePrinter(time)
                        printerId.setPrinterId(cubiconPrinter.id)
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
                    {$cubiconPrinterInfo[topCubiconTimeArray.indexOf(time)]
                        ?.user.profile.name}
                    <h2 class="text-xs">
                        사유: {$cubiconPrinterInfo[
                            topCubiconTimeArray.indexOf(time)
                        ]?.reason}
                    </h2>
                {/if}
            </button>
            <button
                class={guider2TimeArray.includes(time)
                    ? 'h-20 w-40 border-gray-300 bg-blue-400 text-black'
                    : 'h-20 w-40 border-2 border-gray-300 bg-gray-200 text-black'}
                on:click={() => {
                    if (!guider2TimeArray.includes(time)) {
                        setTimePrinter(time)
                        printerId.setPrinterId(guider2Printer.id)
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
                    {$guider2PrinterInfo[topGuider2TimeArray.indexOf(time)]
                        ?.user.profile.name}
                    <h2 class="text-xs">
                        사유: {$guider2PrinterInfo[
                            topGuider2TimeArray.indexOf(time)
                        ]?.reason}
                    </h2>
                {/if}
            </button>
        </div>
    {/each}
</div>
