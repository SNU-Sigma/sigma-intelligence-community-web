<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { addHours } from 'date-fns'
    import { CreatePrinterReservationPayload } from '../../domain/printer/CreatePrinterReservationPayload'
    import { PrintAPIImpl } from '../../infrastructure/sigma-api/PrintAPIImpl'

    import { allPrinters } from '../../domain/printer/model/Printer'
    import OverlaySpinner from '../common/OverlaySpinner.svelte'
    import PrinterReservationDateTimePicker from './PrinterReservationDateTimePicker.svelte'

    let isLoading = false
    let newUsageTime: number | undefined
    let newReason: string
    let newStartDateTime = $CreatePrinterReservationPayload.startingDateTime
    let newPrinterId = $CreatePrinterReservationPayload.printerId

    const timeOptions = [
        { value: 1, label: '1시간' },
        { value: 2, label: '2시간' },
        { value: 3, label: '3시간' },
        { value: 4, label: '4시간' },
        { value: 5, label: '5시간' },
        { value: 6, label: '6시간' },
        { value: 7, label: '7시간' },
        { value: 8, label: '8시간' },
    ]

    $: newEndDateTime =
        newUsageTime === undefined
            ? undefined
            : addHours(newStartDateTime, newUsageTime)

    const submitForm = async () => {
        if (
            newEndDateTime === undefined ||
            newUsageTime === undefined ||
            newReason === undefined ||
            newReason.trim().length === 0
        ) {
            toastStore.trigger({
                message: '비어있는 항목이 있습니다.',
                preset: 'error',
            })
            return
        }
        isLoading = true
        try {
            await PrintAPIImpl.updatePrintSchedule({
                printerId: newPrinterId,
                startDateTime: newStartDateTime,
                usageTime: newUsageTime,
                reason: newReason,
            })
            toastStore.trigger({
                message: '프린터 예약에 성공했습니다.',
                preset: 'success',
            })
        } catch (e) {
            toastStore.trigger({
                message: '프린터 예약에 실패했습니다',
                preset: 'error',
            })
        } finally {
            isLoading = false
        }
    }
</script>

{#if isLoading}
    <OverlaySpinner />
{/if}
<div class="flex flex-col items-baseline">
    <h2>프린터 예약 화면</h2>
    <div class="h-8" />
    <div class="w-128 flex flex-col gap-2 text-left">
        <label>
            <span class="text-base">제목</span>
            <input
                type="text"
                name="reason"
                class="placeholder:text-sm placeholder:italic placeholder:text-slate-500"
                placeholder="제목을 입력하세요..."
                bind:value={newReason}
            />
        </label>
        <span>프린터 아이디</span>
        <select bind:value={newPrinterId}>
            {#each allPrinters as { id, label }}
                <option value={id}>{label}</option>
            {/each}
        </select>
        <span>
            시작 시간 | {newStartDateTime.toLocaleString()}
        </span>
        <PrinterReservationDateTimePicker bind:value={newStartDateTime} />
        <span>사용 시간</span>
        <div class="columns-4 space-y-4">
            {#each timeOptions as option}
                <button
                    class:variant-ghost-primary={newUsageTime === option.value}
                    class:variant-ringed-secondary={newUsageTime !==
                        option.value}
                    class="btn flex w-full"
                    on:click={() => {
                        newUsageTime = option.value
                    }}
                >
                    {option.label}
                </button>
            {/each}
        </div>
        {#if newEndDateTime}
            <span>종료 시간 | {newEndDateTime.toLocaleString()}</span>
        {:else}
            <span>종료 시간 |</span>
        {/if}
        <button on:click={submitForm} class="btn variant-filled-primary flex">
            예약 확정
        </button>
    </div>
    <div class="h-8" />
</div>
