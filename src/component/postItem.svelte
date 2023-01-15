<script lang="ts">
    import type { PostDto } from '../store'
    export let post: PostDto
</script>

<div class="layout">
    No. {post.id}

    <button class="btn">{post.content} </button>

    updated: {post.updatedAt.substring(0, 10)}
    {post.updatedAt.substring(11, 16)}
</div>

<style>
    .layout {
        background-size: cover;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .btn {
        padding: 0;
        padding-bottom: 3px;
        background-color: white;
        color: darkgreen;
        font-size: 1em;
        border: none;
        margin-left: 0;
        margin-right: 5px;
        text-decoration: none;
        cursor: pointer;
    }
    .btn:hover {
        border-bottom: 2px solid #005eff;
    }
</style>
