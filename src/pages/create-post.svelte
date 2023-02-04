<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createImageUpload } from '../lib/util/createImageUpload'
    import { PostAPIImpl } from '../lib/infrastructure/sigma-api/PostAPIImpl'

    let title = ''
    let content = ''
    let imageUrls: Array<string> = []

    const { files$, validFileTypes, handleMultiUpload } = createImageUpload()
    async function updateUrl() {
        imageUrls = await handleMultiUpload()
    }

    let textRows = 28
    $: if ($files$ && $files$.length) {
        updateUrl()
        textRows = 20
    } else {
        updateUrl()
        textRows = 28
    }

    function postUpload() {
        if (title.trim().length && content.trim().length) {
            PostAPIImpl.createPost({
                title,
                content,
                imageUrls,
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
            // TODO: 게시글 목록으로 이동해야 함
        } else {
            toastStore.trigger({
                message: '제목과 내용이 비어있지 않아야 합니다.',
                preset: 'error',
            })
        }
    }
</script>

<div class="flex flex-col gap-3 w-11/12 h-full mt-10">
    <div class="grid grid-flow-col">
        <div class="text-xl">게시글 작성하기</div>
        <label for="file">
            <div class="btn btn-filled-primary float-right inline-block">
                사진첨부
            </div>
        </label>
        <input
            id="file"
            class="hidden"
            accept={validFileTypes.join(',')}
            type="file"
            bind:files={$files$}
            multiple
        />
    </div>
    <input
        type="text"
        placeholder="제목"
        class="text-sm w-full"
        bind:value={title}
    />
    {#if $files$ && imageUrls}
        <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap inline">
            {#each imageUrls as imgUrl}
                <img
                    src={imgUrl}
                    alt="이미지 미리보기"
                    class="whitespace-nowrap h-40 mx-3 mb-4 inline-block"
                />
            {/each}
        </div>
    {/if}

    <textarea
        name="content"
        id="content"
        cols="30"
        rows={textRows}
        placeholder="게시글을 작성해주세요."
        class="text-sm w-full"
        bind:value={content}
    />
</div>
<div class="absolute bottom-6 right-6">
    <button class="btn btn-filled-primary" on:click={postUpload}>게시 </button>
</div>
