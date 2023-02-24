<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createImageUpload } from '../lib/util/createImageUpload'
    import { PostAPIImpl } from '../lib/infrastructure/sigma-api/PostAPIImpl'
    import PlusIcon from '../assets/images/+.svg'
    import DeleteIcon from '../assets/images/X.svg'
    import { goto } from '@roxi/routify'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'

    let isLoading = false

    let title = ''
    let description = ''
    let images: Array<string> = []

    const { files$, validFileTypes, handleMultiUpload } = createImageUpload()

    const postUpload = () => {
        if (title.trim().length && description.trim().length) {
            isLoading = true
            handleMultiUpload().then((res) => {
                images = res
                PostAPIImpl.createPost({
                    title,
                    description,
                    images,
                })
                    .then(() => {
                        toastStore.trigger({
                            message: '게시글이 업로드 되었습니다.',
                            preset: 'success',
                        })
                        $goto('/feed')
                    })
                    .catch(() => {
                        toastStore.trigger({
                            message:
                                '게시글 업로드 중 오류가 발생했습니다. 다시 시도해주세요.',
                            preset: 'error',
                        })
                    })
                    .finally(() => {
                        isLoading = false
                    })
            })
        } else {
            toastStore.trigger({
                message: '제목과 내용이 비어있지 않아야 합니다.',
                preset: 'error',
            })
        }
    }

    let input: FileList
    let inputFiles: Array<File> = []
    let imagePreview: Array<Element> = new Array<Element>(10)
    let showPreview: Array<boolean> = new Array<boolean>(10)
    showPreview.fill(false)

    const addImage = () => {
        if (inputFiles.length < 10) {
            const file = input[0]
            if (file) {
                inputFiles.push(file)
                updatePreview()
                showPreview[inputFiles.length - 1] = true
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
        inputFiles.splice(idx, 1)
        updatePreview()
        showPreview[inputFiles.length] = false
    }

    const refresh = (event: Event) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }

    const updatePreview = () => {
        const dataTransfer = new DataTransfer()
        let fileArray: Array<File> = []

        for (let idx in inputFiles) {
            const file = inputFiles[idx]
            const image = imagePreview[idx]
            if (file && image) {
                const reader = new FileReader()
                reader.addEventListener('load', () => {
                    if (typeof reader.result === 'string') {
                        image.setAttribute('src', reader.result)
                        imagePreview[idx] = image
                    }
                })
                reader.readAsDataURL(file)
                fileArray.push(file)
            }
        }
        fileArray.forEach((file) => {
            dataTransfer.items.add(file)
        })
        $files$ = dataTransfer.files
        console.log($files$)
        console.log(showPreview)
    }
</script>

{#if isLoading}
    <OverlaySpinner />
{/if}

<div class="mx-auto flex w-11/12 flex-col items-center gap-3 pt-10">
    <div class="text-xl">게시글 작성하기</div>
    <input
        type="text"
        placeholder="제목"
        class="w-full text-sm"
        bind:value={title}
    />
    <textarea
        name="content"
        id="content"
        cols="30"
        rows="20"
        placeholder="게시글을 작성해주세요."
        class="w-full text-sm"
        bind:value={description}
    />
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

            {#each imagePreview as image, i}
                <div
                    class="relative flex-shrink-0"
                    class:hidden={!showPreview[i]}
                >
                    <img
                        bind:this={image}
                        src=""
                        alt="Preview"
                        class="h-44 w-44 object-cover"
                    />
                    <button
                        class="btn absolute top-0 right-0 h-5 w-5 bg-error-900 p-0.5"
                        on:click={() => deleteImage(i)}
                    >
                        <img src={DeleteIcon} alt="" />
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>
<div class="absolute bottom-6 right-6">
    <button class="btn variant-filled-primary" on:click={postUpload}>
        게시
    </button>
</div>

<style>
    .hidden {
        visibility: hidden;
    }
</style>
