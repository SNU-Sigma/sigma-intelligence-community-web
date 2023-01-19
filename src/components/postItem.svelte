<script>
    import { postData } from '../store/postGet'
    import { goto } from '@roxi/routify'
    export let postdata

    const handleDeletePost = () => postData.deletePost(postdata)
</script>

<div class="main">
    {#if postdata.published === true}
        <ul>
            <li>
                <p class="bold_big_text">[{postdata.id}] {postdata.title}</p>
            </li>
            <button
                on:click={async () => {
                    await handleDeletePost()
                }}>삭제하기</button
            >
            <button
                class="btn"
                on:click={async () => {
                    $goto('/postEdit/:id', { id: postdata.id })
                }}
            >
                수정하기
            </button>
            <li><span class="small_text">{postdata.content}</span></li>
        </ul>
    {:else}
        <ul>
            <li>
                <p class="transparent_big_text">
                    [{postdata.id}] {postdata.title}
                </p>
            </li>
            <button on:click={handleDeletePost}>삭제하기</button>
            <button
                class="btn"
                on:click={async () => {
                    $goto('/postEdit/:id', { id: postdata.id })
                }}
            >
                수정하기
            </button>
            <li>
                <span class="transparent_small_text"> {postdata.content}</span>
            </li>
        </ul>
    {/if}
</div>

<style>
    .transparent_big_text {
        color: gray; /* fallback */
        color: rgba(0, 0, 0, 0.5);
        font-size: 17px;
    }

    .transparent_small_text {
        color: gray; /* fallback */
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
    }

    .bold_big_text {
        font-size: 17px;
    }
    .small_text {
        font-size: 12px;
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
    .main ul li span {
        padding: 7px;
    }
</style>
