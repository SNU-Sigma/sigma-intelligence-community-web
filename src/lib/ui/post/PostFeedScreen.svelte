<script lang="ts">
    import { url } from '@roxi/routify'
    import { toastStore } from '@skeletonlabs/skeleton'
    import { onMount } from 'svelte'
    import type { PostFeedDto } from '../../domain/posts/model/PostFeedDto'
    import { PostAPIImpl } from '../../infrastructure/sigma-api/PostAPIImpl'
    import OverlaySpinner from '../common/OverlaySpinner.svelte'

    let isLoading = false

    let posts: Array<PostFeedDto> = []

    onMount(() => {
        isLoading = true
        PostAPIImpl.fetchAllPosts()
            .then((result) => {
                posts = result
            })
            .catch(() => {
                toastStore.trigger({
                    message:
                        '게시글 로딩 중 오류가 발생했습니다. 다시 시도해주세요.',
                    preset: 'error',
                })
            })
            .finally(() => {
                isLoading = false
            })
    })
</script>

{#if isLoading}
    <OverlaySpinner />
{/if}

<div class="mx-auto flex w-10/12 scroll-pb-10 flex-col gap-5 pt-5">
    <div class="text-xl">SIGMA BOARD</div>
    {#each posts as post}
        <div class="card card-hover p-2.5 text-left">
            <div class="flex flex-row justify-between">
                <div class="text-lg">{post.title}</div>
                {#if post.isMyPost}
                    <button
                        class="btn p-0 text-xs text-error-500"
                        on:click={async () => {
                            await PostAPIImpl.deletePost(post.id)
                        }}
                    >
                        삭제
                    </button>
                {/if}
            </div>

            <div class="flex justify-between text-xs">
                <div>{post.user.profile.name} ({post.user.email})</div>
                <div>
                    {new Date(post.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </div>
            </div>

            <p class="my-3 whitespace-pre-wrap text-sm">
                {post.description}
            </p>
            <div
                class="flex overflow-x-auto overflow-y-hidden whitespace-nowrap"
            >
                {#each post.images as imgUrl}
                    <img
                        src={imgUrl}
                        alt="이미지 미리보기"
                        class="mx-3 mb-4 inline-block h-44 max-w-none whitespace-nowrap"
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>

<div class="fixed bottom-20 z-20 mr-3 self-end">
    <a href={$url('/create-post')} class="btn variant-filled-primary">
        새글작성
    </a>
</div>
