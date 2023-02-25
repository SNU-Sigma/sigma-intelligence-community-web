<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import PlusIcon from '../../../assets/images/+.svg'
    import DeleteIcon from '../../../assets/images/X.svg'
    import PreviewImage from './PreviewImage.svelte'

    export let files: FileList
    export let validFileTypes: Array<string>

    let input: FileList
    let inputFiles: Array<File> = []

    const addImage = () => {
        if (inputFiles.length < 10) {
            const file = input[0]
            if (file) {
                inputFiles = [...inputFiles, file]
                updatePreview()
            } else {
                toastStore.trigger({
                    message: '유효한 파일 형식이 아닙니다.',
                    preset: 'error',
                })
            }
        } else {
            toastStore.trigger({
                message: '이미지 업로드는 최대 10장 까지 가능합니다.',
                preset: 'error',
            })
        }
    }

    const deleteImage = (idx: number) => {
        const newInputFiles = [...inputFiles]
        newInputFiles.splice(idx, 1)
        inputFiles = newInputFiles
        updatePreview()
    }

    const refresh = (event: Event) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    const updatePreview = () => {
        const dataTransfer = new DataTransfer()

        inputFiles.forEach((file) => {
            dataTransfer.items.add(file)
        })
        files = dataTransfer.files
    }
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
            on:change={() => addImage()}
            on:click={(e) => refresh(e)}
        />

        {#each inputFiles as file, idx}
            <div class="relative flex-shrink-0">
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
