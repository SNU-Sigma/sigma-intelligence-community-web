<script lang="ts">
    import { goto } from '@roxi/routify'

    // import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import { addDays, addWeeks, startOfWeek } from 'date-fns'
    import { newDate } from '../lib/domain/printer/startingDate'

    let printDate = new Date()
    let clickNum = 0

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
    const increment = () => [(clickNum = clickNum + 1)]
    const decrement = () => {
        clickNum = clickNum - 1
    }
    const setPrintDate = (day: Date) => {
        printDate = day
    }
    const setTimePrinter = async (time: number) => {
        printDate.setHours(time)
        printDate.setMinutes(0)
        printDate.setMilliseconds(0)
        newDate.makeNewDate(
            printDate.getFullYear(),
            printDate.getMonth(),
            printDate.getDate(),
            printDate.getHours(),
        )
        $goto('/printer')
    }

    // let daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']
    $: showDate = new Date(addWeeks(new Date(), clickNum))

    let timeArray = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
    ]
    //             btn btn-filled-primary rounded-full text-xs px-2 py-1
</script>

<div
    class="absolute top-1 left-1 right-1 flex flex-col rounded-md bg-primary-100 pb-2"
>
    <h2 class="relative left-1 font-bold">SIGMA 3D PRINTER</h2>
    <h2 class="relative left-1 text-base">
        {showDate.getFullYear()}년 {showDate.getMonth() + 1}월
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
        {#each weekArrayCreator(showDate) as day}
            <button
                class={printDate > day || printDate < day
                    ? 'btn variant-filled-primary rounded-full px-2 py-1 text-xs'
                    : 'btn variant-filled-secondary rounded-full px-2 py-1 text-xs'}
                on:click={() => {
                    setPrintDate(day)
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
    {#each timeArray as time}
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
                class="border-2 border-gray-300 bg-gray-200 px-20 py-6 text-black"
                on:click={() => {
                    setTimePrinter(time)
                }}
            />
            <button
                class="border-2 border-gray-300 bg-gray-200 px-20 py-6 text-black"
                on:click={() => {
                    setTimePrinter(time)
                }}
            />
        </div>
    {/each}
</div>
