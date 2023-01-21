<script>
    import { onMount } from 'svelte'
    import { postData } from '../store/postGet'
    import { fade } from 'svelte/transition'
    import PostItem from './postItem.svelte'

    onMount(postData.readPostDatas)
</script>

<div class="main">
    <ul>
        {#each $postData as postdata}
            <li in:fade out:fade={{ duration: 100 }}>
                <PostItem {postdata} />
            </li>
        {/each}
    </ul>
</div>

<style>
    .main {
        width: 100%;
        height: calc(100vh - 270px); /* 최상단 메뉴 있을 경울 - 50*/
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        /* 스크롤 숨기고 스크롤은 되게: IE, Edge, Firefox */
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }
    .main::-webkit-scrollbar {
        display: none;
    }
    .main ul {
        width: 800px;
        margin-top: 10px;
    }
    .main ul li {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 15px;
        margin-bottom: 10px;
        background-color: #ffffff;
        font-size: 1rem;
        color: #444444;
        border-radius: 3px;
    }
</style>
