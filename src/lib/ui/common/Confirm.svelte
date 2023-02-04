<script lang="ts">
    export let title: string
    export let content: string
    export let OKmsg: string
    export let NOmsg: string

    export let onConfirm: () => void
    export let onReject: () => void
</script>

<div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
            class="flex min-h-full items-end justify-center p-3 text-center sm:items-center sm:p-0"
        >
            <div
                class="relative transform overflow-hidden rounded-lg bg-white "
            >
                <div class="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="text-center">
                            <div
                                class="text-lg font-medium leading-6 text-gray-900"
                                id="modal-title"
                            >
                                {title}
                            </div>
                            <div class="text-sm text-gray-900">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                    <button
                        type="button"
                        class="btn btn-filled-error ml-3"
                        on:click={onConfirm}>{OKmsg}</button
                    >
                    <button
                        type="button"
                        class="btn btn-filled-error ml-3"
                        on:click={onReject}>{NOmsg}</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
