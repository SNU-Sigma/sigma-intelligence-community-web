<script lang="ts">
    import { postForm1, postForm2, posts } from '../store_post'
    let yes: boolean
    const handleTodoAdd = () => {
        posts.addPost($postForm1, $postForm2, yes)
        postForm1.resetForm()
        postForm2.resetForm()
    }
</script>

<header>
    <div class="wrap">
        <h1>SVELTE TODO</h1>
        <input type="text" bind:value={$postForm1} />
        <input type="text" bind:value={$postForm2} />
        <button on:click={handleTodoAdd}>save</button>
    </div>
</header>
