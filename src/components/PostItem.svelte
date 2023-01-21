<script lang="ts">
    import { posts } from '../store_post'
    import { createEventDispatcher } from 'svelte'
    export let post

    const handleRemovePost = () => posts.removePost(post.id)
</script>

<input type="text" bind:value={post.title} />
<a href="#null" on:click={handleRemovePost}>X</a>
