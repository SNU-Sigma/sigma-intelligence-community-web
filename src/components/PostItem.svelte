<script lang="ts">
    import { posts } from '../store_post'
    import { createEventDispatcher } from 'svelte'
    export let post

    const handleRemovePost = () => posts.removePost()
</script>

<p>
    title: {post.title}
    <button on:click={handleRemovePost}> 삭제</button>
    <button on:click={handleRemovePost}>수정</button>
</p>
