<script lang="ts">
    import { postForm1, postForm2, posts } from '../store_post'
    import { goto } from '@roxi/routify'
    let yes = true
    let no = false
    const handleTosavepre = () => {
        posts.addPost($postForm1, $postForm2, no)
        postForm1.resetForm()
        postForm2.resetForm()
    }
    const handleTodoAdd = () => {
        posts.addPost($postForm1, $postForm2, yes)
        postForm1.resetForm()
        postForm2.resetForm()
    }
</script>

<header class="header">
    <div class="wrap" style="text-align:center">
        <h1 class="main-title">WRITE POST</h1>
        <p>title: <input type="text" bind:value={$postForm1} /></p>
        <p>content: <input type="text" bind:value={$postForm2} /></p>
        <p>
            <button
                on:click={() => {
                    handleTosavepre
                    $goto('/Post')
                }}>임시저장</button
            >
            <button
                on:click={//handleTodoAdd
                () => $goto('/Post')}>완료하기</button
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
