<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    // import { createForm } from 'felte'
    import {
        PrintAPIImpl,
        type CreateReservationDto,
    } from '../../infrastructure/sigma-api/PrintAPIImpl'
    // import { PrintInfo$, type PrinterReservationDto } from '../../domain/printer/PrintInfo'
    import OverlaySpinner from '../common/OverlaySpinner.svelte'
    import { newDate } from '../../domain/printer/startingDate'

    let isLoading = false

    /*const { form } = createForm<CreateReservationDto>({
        onSubmit: async (values) => {
            const { printerId, startDateTime, usageTime, reason } = values
            isLoading = true
            try {
                await PrintAPIImpl.UpdatePrintSchedule(values)              
                // PrintInfo$.setNewUserSchedule(values) -> user 정보 받기는 따로 구현할 필요 없음 (쿠키 사용?)
            } catch (e) {
                toastStore.trigger({
                    message: '프린터 예약에 실패했습니다.',
                    preset: 'error',
                })
            } finally {
                isLoading = false
            }
        },
    })*/

    let newPrintId: number
    let newStartDateTime: Date
    let newUsageTime: number
    let newReason: string
    let printerOptions = [
        { value: 1, label: '1번 프린터' },
        { value: 2, label: '2번 프린터' },
    ]
    let timeOptions = [
        { value: 1, label: '1시간' },
        { value: 2, label: '2시간' },
        { value: 3, label: '3시간' },
        { value: 4, label: '4시간' },
        { value: 5, label: '5시간' },
        { value: 6, label: '6시간' },
        { value: 7, label: '7시간' },
        { value: 8, label: '8시간' },
    ]
    $: newStartTime = new Date(newStartDateTime)
    $: newStartTime.setHours(newStartTime.getHours() + newUsageTime)
    $: newEndDateTime = newStartTime

    const submitForm = async () => {
        let newPrinterSchedule: CreateReservationDto = {
            printerId: newPrintId,
            startDateTime: newStartDateTime,
            usageTime: newUsageTime,
            reason: newReason,
        }
        isLoading = true
        try {
            console.log(newPrinterSchedule)
            await PrintAPIImpl.UpdatePrintSchedule(newPrinterSchedule)
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
        <span>제목</span>
        <input
            type="text"
            name="reason"
            class="placeholder:italic placeholder:text-slate-500"
            placeholder="제목을 입력하세요..."
            bind:value={newReason}
        />
        <span>프린터 아이디</span>
        <select
            class="placeholder:text-slate-50"
            placeholder="프린터를 선택하세요..."
            bind:value={newPrintId}
        >
            {#each printerOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
        {#if newStartDateTime}
            <span>시작 시간 | {newStartDateTime} </span>
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
                    class="flex btn btn-filled-secondary w-full"
                    on:click={() => {
                        newUsageTime = option.value
                    }}>{option.label}</button
                >
            {/each}
        </div>
        {#if newStartDateTime && newUsageTime}
            <span>종료 시간 | </span>
            <span>{newEndDateTime} </span>
        {:else}
            <span>종료 시간 | </span>
        {/if}
        <button on:click={submitForm} class="flex btn btn-filled-primary"
            >예약 확정</button
        >
        <button on:click={() => console.log(newStartTime)}> 클릭 </button>
    </div>
    <div class="h-8" />
</div>
