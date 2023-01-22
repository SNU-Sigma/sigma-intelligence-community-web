<script lang="ts">
    import { goto, params } from '@roxi/routify'
    import { posts, type Post } from '../store_post'

    const id = Number($params.id)

    const post = $posts.find((post) => post.id === id) as Post
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
