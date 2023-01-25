<script>
    import PostHeader from '../components/postHeader.svelte'
    import PostList from '../components/postList.svelte'
    import PostInfo from '../components/postInfo.svelte'
    import { checkLogin } from '../store/postLogin'

    console.log($checkLogin)
</script>

{#if $checkLogin === true}
    <div class="app">
        <PostHeader />
        <PostInfo />
        <PostList />
    </div>
{:else}
    <header>
        <div class="wrap">
            <h1>Login to access PostHome</h1>
        </div>
    </header>
{/if}

<style>
    .app {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
    header {
        width: 100%;
        height: 200px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #0d15a6;
    }
    header .wrap {
        color: aliceblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 800px;
    }
</style>
