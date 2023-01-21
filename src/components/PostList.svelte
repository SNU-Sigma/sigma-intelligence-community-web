<script lang="ts">
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate'

    import { fetchPosts } from '../store_post'
    import PostItem from './PostItem.svelte'
</script>

<div class="main">
    <ul>
        {#each $fetchPosts as post, index (post)}
            <li
                in:fade
                out:fade={{ duration: 100 }}
                animate:flip={{ duration: 1000 }}
            >
                <PostItem {post} />
            </li>
        {/each}
    </ul>
</div>
