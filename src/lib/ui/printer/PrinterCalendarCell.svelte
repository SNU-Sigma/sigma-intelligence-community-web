<script lang="ts">
    import type { Printer } from '../../domain/printer/model/Printer'
    import type { CellPrinterReservation } from './model/CellPrinterReservation'
    import { goto } from '@roxi/routify'
    import { CreatePrinterReservationPayload } from '../../domain/printer/CreatePrinterReservationPayload'
    import axios from 'axios'
    import { toastStore } from '@skeletonlabs/skeleton'

    export let cell: CellPrinterReservation | undefined
    export let selectedDate: Date
    export let hour: number
    export let printer: Printer
    export let filledClass: string

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
            setPayloadForCreation(printer.id, hour)
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
