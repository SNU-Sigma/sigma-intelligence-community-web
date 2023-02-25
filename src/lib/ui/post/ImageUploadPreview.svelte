<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import PlusIcon from '../../../assets/images/+.svg'
    import DeleteIcon from '../../../assets/images/X.svg'
    import PreviewImage from './PreviewImage.svelte'
    import { flip } from 'svelte/animate'
    import { scale } from 'svelte/transition'

    export let files: FileList
    export let validFileTypes: Array<string>

    let input: FileList
    let inputFiles: Array<{ file: File; id: string }> = []

    const MAX_IMAGE_COUNT = 10

    const addImage = () => {
        inputFiles = [
            ...Array.from(input).map((file) => ({
                file,
                id: crypto.randomUUID(),
            })),
            ...inputFiles,
        ]
        if (inputFiles.length > MAX_IMAGE_COUNT) {
            toastStore.trigger({
                message: `이미지 업로드는 최대 ${MAX_IMAGE_COUNT}장까지 가능합니다.`,
                preset: 'warning',
            })
            inputFiles = inputFiles.slice(-MAX_IMAGE_COUNT)
        }
    }

    const deleteImage = (idx: number) => {
        const newInputFiles = [...inputFiles]
        newInputFiles.splice(idx, 1)
        inputFiles = newInputFiles
    }

    const refresh = (event: Event) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    const synchronizeFilesWithExternalProp = (fileArray: Array<File>) => {
        const dataTransfer = new DataTransfer()

        fileArray.forEach((file) => {
            dataTransfer.items.add(file)
        })
        files = dataTransfer.files
    }

    $: synchronizeFilesWithExternalProp(inputFiles.map(({ file }) => file))
</script>

<div class="relative w-full">
    <div
        class="flex gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap pt-3"
    >
        <label for="file">
            <div class="btn flex h-44 w-44 flex-shrink-0 bg-surface-500">
                <img src={PlusIcon} alt="" class="h-14 w-14" />
            </div>
        </label>

        <input
            class="hidden"
            type="file"
            id="file"
            bind:files={input}
            accept={validFileTypes.join(',')}
            multiple
            on:change={() => addImage()}
            on:click={(e) => refresh(e)}
        />
        <div class="flex gap-3">
            {#each inputFiles as { file, id }, idx (id)}
                <div
                    class="relative flex-shrink-0"
                    transition:scale|local={{ duration: 500 }}
                    animate:flip={{ duration: 500 }}
                >
                    <PreviewImage {file} />
                    <button
                        class="btn absolute top-0 right-0 h-5 w-5 bg-error-900 p-0.5"
                        on:click={() => deleteImage(idx)}
                    >
                        <img src={DeleteIcon} alt="" />
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>
