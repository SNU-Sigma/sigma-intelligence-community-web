<script>
    import PostHeader from '../components/postHeader.svelte'
    import PostItem from '../components/postItem.svelte'
    import PostList from '../components/postList.svelte'
    import PostInfo from '../components/postInfo.svelte'
</script>

<div class="app">
    <PostHeader />
    <PostInfo />
    <PostList />
</div>

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
</style>
