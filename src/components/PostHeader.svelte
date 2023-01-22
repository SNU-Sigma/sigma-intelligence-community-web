<script lang="ts">
    import { postForm1, postForm2, posts } from '../store_post'
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

<header>
    <div class="wrap">
        <h1 class="main-title">SVELTE POST</h1>
        <p>title: <input type="text" bind:value={$postForm1} /></p>
        <p>content: <input type="text" bind:value={$postForm2} /></p>
        <p>
            <button on:click={handleTosavepre}>임시저장</button>
            <button on:click={handleTodoAdd}>완료하기</button>
        </p>
    </div>
</header>
