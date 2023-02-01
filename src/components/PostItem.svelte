<script lang="ts">
    import { posts, type Post } from '../store_post'
    import { goto } from '@roxi/routify'
    export let post: Post
</script>

<p>
    title: {post.title}
    <button on:click={() => posts.removePost(post.id)}> 삭제</button>
    <button on:click={() => $goto('/edit', { id: post.id })}>수정</button>
</p>
