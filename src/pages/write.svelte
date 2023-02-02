<script lang="ts">
    import { posts } from '../store_post'
    import { goto } from '@roxi/routify'

    let title = ''
    let content = ''

    const handlePostTemporarySave = () => {
        posts.addPost(title, content, false)
        title = ''
        content = ''
    }
    const handlePostPublish = () => {
        posts.addPost(title, content, true)
        title = ''
        content = ''
    }
</script>

<header class="header">
    <div class="wrap" style="text-align:center">
        <h1 class="main-title">WRITE POST</h1>
        <p>title: <input type="text" bind:value={title} /></p>
        <p>content: <input type="text" bind:value={content} /></p>
        <p>
            <button
                on:click={() => {
                    handlePostTemporarySave()
                    $goto('/Post')
                }}>임시저장</button
            >
            <button
                on:click={() => {
                    handlePostPublish()
                    $goto('/Post')
                }}>완료하기</button
            >
        </p>
    </div>
</header>

<style>
    .header {
        background-color: skyblue;
        color: black;
        padding: 20px;
    }
    p {
        font-size: 15px;
    }
</style>
