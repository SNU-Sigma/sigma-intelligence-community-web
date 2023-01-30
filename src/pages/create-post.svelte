<script lang="ts">
    import type { CreatePostDto } from '../lib/domain/posts/model/CreatePostDto'
    import { toastStore } from '@skeletonlabs/skeleton'
    import Confirm from '../lib/ui/common/Confirm.svelte'
    import { createImageUpload } from '../lib/util/createImageUpload'
    import { PostAPIImpl } from '../lib/infrastructure/sigma-api/PostAPIImpl'

    let {
        title,
        content,
        imageUrls: uploadedImageUrl,
    }: CreatePostDto = {
        title: '',
        content: '',
        imageUrls: [],
    }

    async function updateUrl() {
        uploadedImageUrl = await multiHandleUpload()
    }

    const { files$, validFileTypes, multiHandleUpload } = createImageUpload()

    $: if ($files$ && $files$.length) {
        updateUrl()
        textRows = 14
    } else {
        updateUrl()
        textRows = 22
    }

    let textRows = 22
    let showAlert = false
    function NOfunc() {
        showAlert = false
    }
    function OKfunc() {
        showAlert = false
        window.location.href = '/'
    }

    function PostUpload() {
        if (title.trim().length && content.trim().length) {
            PostAPIImpl.createPost({
                title,
                content,
                imageUrls: uploadedImageUrl,
            })
            toastStore.trigger({
                message: '게시글이 업로드 되었습니다.',
                preset: 'success',
            })
            // window.location.href = '/'
        } else {
            toastStore.trigger({
                message: '제목과 내용이 비어있지 않아야 합니다.',
                preset: 'error',
            })
        }
    }
</script>

<div class="flex flex-col gap-3 w-11/12 h-full mt-10">
    <div class="flex justify-between">
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
            on:click={() => (showAlert = true)}
        >
            취소하기
        </button>
        게시글 작성하기
        <label for="file">
            <div
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
            >
                사진첨부
            </div>
        </label>
        <input
            name="file"
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
    {#if $files$ && uploadedImageUrl}
        <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap inline">
            {#each uploadedImageUrl as imgUrl}
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
    <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 text-xl focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
        on:click={PostUpload}
        >게시
    </button>
</div>

{#if showAlert}
    <Confirm
        title="이 게시물을 삭제하시겠어요?"
        content="지금 삭제하면 이 게시물이 사라집니다."
        OKmsg="게시물 삭제"
        NOmsg="계속 수정"
        {NOfunc}
        {OKfunc}
    />
{/if}
