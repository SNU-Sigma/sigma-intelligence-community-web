<script lang="ts">
    import PostItem from '../component/postItem.svelte'
    import { posts } from '../store'
    posts.updatePost()
</script>

<div class="main">
    <ul>
        {#each $posts as post (post.id)}
            <li>
                <PostItem {post} />
            </li>
        {/each}
    </ul>
</div>
