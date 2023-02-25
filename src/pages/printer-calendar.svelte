<script lang="ts">
    import {
        addDays,
        addWeeks,
        isEqual,
        startOfDay,
        startOfWeek,
    } from 'date-fns'
    import { onMount } from 'svelte'
    import { CreatePrinterReservationPayload } from '../lib/domain/printer/CreatePrinterReservationPayload'
    import { allPrinters } from '../lib/domain/printer/model/Printer'
    import { createPrinterStore } from '../lib/domain/printer/PrintInfo'
    import { deriveTimeArray } from '../lib/domain/printer/TimeArray'
    import PrinterCalendarCell from '../lib/ui/printer/PrinterCalendarCell.svelte'
    import DirectionIcon from '../assets/images/DirectionIcon.svg'

    const allStartingHours = Array.from({ length: 24 }, (_, index) => index)

    let weekOffset = 0
    let selectedDate = startOfDay(new Date())

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
        CreatePrinterReservationPayload.setDate(selectedDate)
        await refetchPrinterReservations()
    }

    $: allPrintersInfo = allPrinters.map((printer) => ({
        printer,
        printerStore: createPrinterStore(printer.id),
    }))

    $: allPrintersCells = allPrintersInfo.map((printerInfo) =>
        deriveTimeArray({
            ...printerInfo,
            selectedDate,
        }),
    )

    const refetchPrinterReservations = async () => {
        await Promise.all(
            allPrintersInfo.map(({ printerStore }) =>
                printerStore.fetchPrinterReservations(selectedDate),
            ),
        )
    }

    onMount(() => {
        refetchPrinterReservations()
    })
</script>

<div class="m-1 flex flex-col rounded-md bg-primary-100 pb-2">
    <h2 class="font-bold">SIGMA 3D PRINTER</h2>
    <h2 class="text-base">
        {displayedWeekDate.getFullYear()}년 {displayedWeekDate.getMonth() + 1}월
    </h2>
    <div class="mt-2 flex flex-row flex-wrap justify-between gap-1">
        <button on:click={decrementWeekOffset}>
            <img src={DirectionIcon} class="h-5 w-5" alt="왼쪽" />
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
                {day.getDate().toString().padStart(2, '0')}
                {day.toLocaleString('ko-KR', { weekday: 'short' })}
            </button>
        {/each}
        <button on:click={incrementWeekOffset}>
            <img src={DirectionIcon} class="h-5 w-5 rotate-180" alt="오른쪽" />
        </button>
    </div>
</div>

<div class="flex flex-row">
    <span class="w-16 text-center text-sm">Time</span>
    {#each allPrinters as { label }}
        <span class="flex-1 text-center text-sm">{label}</span>
    {/each}
</div>

<div class="m-3 ml-0 flex flex-1 flex-col overflow-y-scroll overscroll-contain">
    {#each allStartingHours as time}
        <div class="flex flex-row">
            <div class="w-16 text-center">
                {getTimeLabel(time)}
            </div>
            {#each allPrintersCells as { printer, timeArrayStore }}
                <PrinterCalendarCell hour={time} {printer} {timeArrayStore} />
            {/each}
        </div>
    {/each}
</div>
