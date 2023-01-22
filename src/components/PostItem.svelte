<script lang="ts">
    import { posts } from '../store_post'
    import { createEventDispatcher } from 'svelte'
    import { goto } from '@roxi/routify'
    import Edit from '../pages/edit.svelte'
    export let post
</script>

<p>
    title: {post.title}
    <button on:click={() => posts.removePost(post)}> 삭제</button>
    <button on:click={() => $goto('/edit')}>수정</button>
    <Edit {post} />
</p>
