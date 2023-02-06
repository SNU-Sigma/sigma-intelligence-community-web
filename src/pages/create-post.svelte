<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createImageUpload } from '../lib/util/createImageUpload'
    import { PostAPIImpl } from '../lib/infrastructure/sigma-api/PostAPIImpl'
    import { FileButton } from '@skeletonlabs/skeleton'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'

    let isLoading = false

    let title = ''
    let description = ''
    let images: Array<string> = []

    const { files$, validFileTypes, handleMultiUpload } = createImageUpload()

    $: if ($files$) {
        ;(async () => {
            images = await handleMultiUpload()
        })()
    }

    function postUpload() {
        if (title.trim().length && description.trim().length) {
            isLoading = true
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
            // TODO: 게시글 목록으로 이동해야 함
        } else {
            toastStore.trigger({
                message: '제목과 내용이 비어있지 않아야 합니다.',
                preset: 'error',
            })
        }
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
        <div class="absolute top-2 right-2">
            <FileButton
                accept={validFileTypes.join(',')}
                bind:files={$files$}
                multiple
                button="btn variant-filled-secondary float-right inline-block"
            >
                사진추가
            </FileButton>
        </div>
        <div class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap">
            {#if $files$ && images}
                {#each images as imgUrl}
                    <img
                        src={imgUrl}
                        alt="이미지 미리보기"
                        class="mx-3 mb-4 inline-block h-44 whitespace-nowrap"
                    />
                {/each}
            {/if}
        </div>
    </div>
</div>
<div class="absolute bottom-6 right-6">
    <button class="btn variant-filled-primary" on:click={postUpload}>
        게시
    </button>
</div>
