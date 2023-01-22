<script lang="ts">
    import { posts } from '../store_post'
    import { post } from '../components/PostItem.svelte'
</script>

<p>title: <input type="text" bind:value={$post.title} /></p>
<p>content: <input type="text" bind:value={$post.content} /></p>
<p>
    <button
        on:click={() => {
            $post.published = false
            posts.editPost(post)
        }}>임시저장</button
    >
    <button
        on:click={() => {
            $post.published = true
            posts.editPost(post)
        }}>완료하기</button
    >
</p>
