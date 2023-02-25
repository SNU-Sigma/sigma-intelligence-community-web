<script lang="ts">
    import { goto } from '@roxi/routify'
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
</script>

<button
    class={'h-20 flex-1 overflow-hidden border-2 border-gray-300 px-2 text-black hover:brightness-75 ' +
        (cell !== undefined ? filledClass : 'bg-gray-200')}
    class:border-0={cell !== undefined}
    on:click={() => {
        if (cell === undefined) {
            CreatePrinterReservationPayload.setPrinterAndHour(printer.id, hour)
            $goto('/printer')
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
