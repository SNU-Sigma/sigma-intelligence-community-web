<script lang="ts">
    import { goto } from '@roxi/routify'
    import { toastStore } from '@skeletonlabs/skeleton'
    import axios from 'axios'
    import type { Readable } from 'svelte/store'
    import { CreatePrinterReservationPayload } from '../../domain/printer/CreatePrinterReservationPayload'
    import { PrinterId, type Printer } from '../../domain/printer/model/Printer'
    import type { CellPrinterReservation } from './model/CellPrinterReservation'

    export let hour: number
    export let printer: Printer
    export let timeArrayStore: Readable<Array<CellPrinterReservation>>

    $: cell = $timeArrayStore.find(({ startingHour }) => startingHour === hour)

    $: filledClass = ((): string => {
        switch (printer.id) {
            case PrinterId.cubicon:
                return 'bg-red-400'
            case PrinterId.guider:
                return 'bg-blue-400'
        }
    })()

    const deleteSchedule = async (id: number) => {
        await axios.delete(`/printer-reservation/reservations/${id}`)
        toastStore.trigger({
            message: '프린터 삭제에 성공했습니다.',
            preset: 'success',
        })
    }
</script>

<button
    class={'h-20 w-40 border-2 border-gray-300 bg-gray-200 px-2 text-black' +
        (cell !== undefined ? ` ${filledClass}` : '')}
    class:border-0={cell !== undefined}
    on:click={() => {
        if (cell === undefined) {
            CreatePrinterReservationPayload.setPrinterAndHour(printer.id, hour)
            $goto('/printer')
        } else {
            window.alert('삭제하시겠습니까?')
            deleteSchedule(cell.originalReservation.id)
        }
    }}
>
    {#if cell?.isTop}
        <p class="truncate">
            {cell.originalReservation.reason}
        </p>
        <span class="text-xs">
            {cell.originalReservation.user.profile.name}
        </span>
    {/if}
</button>
