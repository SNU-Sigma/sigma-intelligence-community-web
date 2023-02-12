<script lang="ts">
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import { onMount } from 'svelte'
    import { PostAPIImpl } from '../lib/infrastructure/sigma-api/PostAPIImpl'
    import { toastStore } from '@skeletonlabs/skeleton'
    import type { PostDto } from '../lib/domain/posts/model/PostDto'

    let isLoading = false

    let posts: Array<PostDto> = []
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

{#each posts as post}
    <p>{post.id}{post.title}</p>
{/each}

<div class="absolute bottom-6 right-6">
    <a href="/create-post" class="btn variant-filled-primary">새글작성</a>
</div>
