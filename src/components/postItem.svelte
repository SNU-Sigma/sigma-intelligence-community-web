<script>
    import { postData } from '../store'
    import { url } from '@roxi/routify'
    export let postdata

    const handleDeletePost = () => postData.deletePost(postdata)
</script>

<div class="main">
    {#if postdata.published === true}
        <ul>
            <li>
                <p class="bold_big_text">[{postdata.id}] {postdata.title}</p>
            </li>
            <button on:click={handleDeletePost}>delete</button>
            <a href={$url('/postEdit/:id', { id: postdata.id })} class="btn">
                Edit
            </a>
            <li><span class="small_text">{postdata.content}</span></li>
        </ul>
    {:else}
        <ul>
            <li>
                <p class="transparent_big_text">
                    [{postdata.id}] {postdata.title}
                </p>
            </li>
            <button on:click={handleDeletePost}>delete</button>
            <a href={$url('/postEdit/:id', { id: postdata.id })} class="btn">
                Edit
            </a>
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
    .main ul li a {
        position: absolute;
        top: 25px;
        right: 20px;
        text-decoration: none;
        color: #b8b8b8;
    }
</style>
