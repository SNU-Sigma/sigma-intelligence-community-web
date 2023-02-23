<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { addHours } from 'date-fns'
    import {
        StartingDateTime,
        printerId,
    } from '../../domain/printer/startingDate'
    import { PrintAPIImpl } from '../../infrastructure/sigma-api/PrintAPIImpl'
    import type { CreateReservationDto } from '../../domain/printer/model/CreateReservationDto'

    import OverlaySpinner from '../common/OverlaySpinner.svelte'
    import {
        cubiconPrinter,
        guider2Printer,
    } from '../../domain/printer/model/Printer'

    let isLoading = false
    let newPrintId: number
    let newStartDateTime: string
    let newUsageTime: number
    let newReason: string
    const printerOptions = [
        { value: cubiconPrinter.id, label: cubiconPrinter.label },
        { value: guider2Printer.id, label: guider2Printer.label },
    ]
    const otherPrinterOptions = [
        { value: guider2Printer.id, label: guider2Printer.label },
        { value: cubiconPrinter.id, label: cubiconPrinter.label },
    ]
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
        $StartingDateTime > new Date(0, 0, 0, 0, 0, 0, 0)
            ? addHours($StartingDateTime, newUsageTime)
            : addHours(new Date(newStartDateTime), newUsageTime)

    const submitForm = async () => {
        let newPrinterSchedule: CreateReservationDto = {
            printerId: newPrintId,
            startDateTime:
                $StartingDateTime > new Date(0, 0, 0, 0, 0, 0, 0)
                    ? $StartingDateTime
                    : new Date(newStartDateTime),
            usageTime: newUsageTime,
            reason: newReason,
        }
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
            console.log(newPrinterSchedule)
            await PrintAPIImpl.updatePrintSchedule(newPrinterSchedule)
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
    <!-- <img src="/logo.svg" alt="시그마 인텔리전스 로고" class="w-40" /> -->
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
        <select bind:value={newPrintId}>
            {#if $printerId === 1}
                {#each printerOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            {:else}
                {#each otherPrinterOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            {/if}
        </select>
        {#if $StartingDateTime > new Date(0, 0, 0, 0, 0, 0, 0)}
            <span>시작 시간 | {$StartingDateTime.toLocaleString()}</span>
        {:else if newStartDateTime}
            <span>
                시작 시간 | {new Date(newStartDateTime).toLocaleString()}
            </span>
        {:else}
            <span>시작 시간</span>
        {/if}
        <input
            type="datetime-local"
            name="startDateTime"
            bind:value={newStartDateTime}
        />
        <!-- <span>사용 시간</span> -->
        <!--<input type="text" name="usageTime" bind:value={newUsageTime} /> -->
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
        {#if (newStartDateTime || $StartingDateTime > new Date(0, 0, 0, 0, 0, 0, 0)) && newUsageTime}
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
