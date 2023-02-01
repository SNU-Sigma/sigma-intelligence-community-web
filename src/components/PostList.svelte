<script lang="ts">
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate'

    import { fetchPosts } from '../store_post'
    import PostItem from './PostItem.svelte'
</script>

<div class="main">
    <ul>
        {#each $fetchPosts as post (post.id)}
            <li
                in:fade
                out:fade|local={{ duration: 100 }}
                animate:flip={{ duration: 1000 }}
            >
                {#if post.published === true}
                    <p class="true"><PostItem {post} /></p>
                {:else}
                    <p class="false"><PostItem {post} /></p>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style>
    .true {
        color: black;
    }
    .false {
        color: gray;
    }
</style>
