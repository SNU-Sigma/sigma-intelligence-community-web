<script lang="ts">
    import { goto } from '@roxi/routify'
    import { posts } from '../store_post'
    interface Post {
        id: number
        title: string
        content: string
        published: boolean
    }
    export let post: Post
</script>

<p>title: <input type="text" bind:value={post.title} /></p>
<p>content: <input type="text" bind:value={post.content} /></p>
<p>
    {#if post.published === true}
        <button
            on:click={() => {
                post.published = true
                posts.editPost(post)
                $goto('/Post')
            }}>수정완료</button
        >
    {:else}
        <button
            on:click={() => {
                post.published = false
                posts.editPost(post)
                $goto('/Post')
            }}>임시저장</button
        >
        <button
            on:click={() => {
                post.published = true
                posts.editPost(post)
                $goto('/Post')
            }}>완료하기</button
        >
    {/if}
</p>
