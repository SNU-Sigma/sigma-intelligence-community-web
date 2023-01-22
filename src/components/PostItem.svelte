<script lang="ts">
    import { posts, type Post } from '../store_post'
    import { createEventDispatcher } from 'svelte'
    import { goto } from '@roxi/routify'
    import Edit from '../pages/edit.svelte'
    export let post: Post
</script>

<p>
    title: {post.title}
    <button on:click={() => posts.removePost(post)}> 삭제</button>
    <button on:click={() => $goto('/edit', post)}>수정</button>
</p>
