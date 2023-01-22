<script lang="ts">
    import { posts } from '../store_post'
    import { createEventDispatcher } from 'svelte'
    import { url, isActive } from '@roxi/routify'

    export let post
</script>

<p>
    title: {post.title}
    <button on:click={() => posts.removePost(post)}> 삭제</button>
    <a href={$url('/edit')} class="button">수정</a>
</p>
