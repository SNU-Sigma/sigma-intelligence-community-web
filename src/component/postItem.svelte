<script lang="ts">
    import type { PostDto } from '../store'
    import { url, posts } from '../store'
    import axios from 'axios'
    export let post: PostDto

    let opened = false

    async function deletePost(id: number): Promise<void> {
        try {
            const deleteResult = await axios.delete(url + '/delete/' + id)
            console.log(deleteResult.data)
            posts.updatePost()
        } catch (e) {
            console.error('Post Update failed', e)
        }
    }
</script>

<div class="vertical">
    <div class="layout">
        No. {post.id}

        <button
            class="btn"
            class:gray={!post.published}
            on:click={() => (opened = !opened)}
            >{#if post.title}{post.title}{:else}null{/if}
        </button>

        updated: {new Date(post.updatedAt).toLocaleString()}
    </div>
    {#if opened}
        <div class="textfield">{post.content}</div>
        <div style="margin-top:10px">
            {#if post.published}published {:else}unpublished {/if}
            <a href="/editor/{post.id}"> 수정하기 </a>
            <button on:click={() => deletePost(post.id)}>삭제하기</button>
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
