<script lang="ts">
    import type { PostDto } from '../store'
    export let post: PostDto

    let opened = false
</script>

<div class="vertical">
    <div class="layout">
        No. {post.id}

        <button
            class="btn"
            class:gray={!post.published}
            on:click={() => (opened = !opened)}
            >{post.title}
        </button>

        updated: {post.updatedAt.substring(0, 10)}
        {post.updatedAt.substring(11, 16)}
    </div>
    {#if opened}
        <div class="textfield">{post.content}</div>
        <div style="margin-top:10px">
            {#if post.published}published {:else}unpublished {/if}
            <a href="/editor/{post.id}"> 수정하기 </a>
            <button>삭제하기</button>
        </div>
    {/if}
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

    .textfield {
        border: solid;
        width: 100%;
        margin-top: 10px;
        white-space: pre;
    }

    .gray {
        color: gray;
        font-style: italic;
    }
</style>
