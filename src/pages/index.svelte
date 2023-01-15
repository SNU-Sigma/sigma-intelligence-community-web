<script lang="ts">
    import { posts } from '../store'
    posts.updatePost()
</script>

<div class="main">
    <ul>
        {#each $posts as post}
            <li>
                [id:{post.id}] {post.title}
            </li>
        {/each}
    </ul>
</div>
