<script>
    import { params } from '@roxi/routify'
    import axios from 'axios'
    import { postData } from '../../store/postGet'
    import { onMount } from 'svelte'
    import { url, goto } from '@roxi/routify'

    let editPublishedMode = true
    const editingPostId = $params.id

    async function updatePosts() {
        editedPost.published = true
        await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/update/${editingPostId}`,
            editedPost,
        )
        resetPost()
    }
    async function updatePostsAsFalse() {
        editedPost.published = false
        await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/update/${editingPostId}`,
            editedPost,
        )
        resetPost()
    }

    function resetPost() {
        editedPost.title = ''
        editedPost.content = ''
        editedPost.published = true
    }

    onMount(postData.readPostDatas)
    const filteredData = $postData.filter(
        (post) => post.id === parseInt($params.id),
    )
    editPublishedMode = filteredData[0].published

    let editedPost = {
        title: filteredData[0].title,
        content: filteredData[0].content,
        published: true,
    }
</script>

<header>
    <div class="wrap">
        {#if editPublishedMode === true}
            <ul>
                <li>
                    <span>수정 제목을 입력하세요: </span><input
                        type="text"
                        bind:value={editedPost.title}
                    />
                </li>
                <li>
                    <span>수정 본문을 입력하세요: </span><input
                        type="text"
                        bind:value={editedPost.content}
                    />
                </li>
                <button
                    class="btn"
                    on:click={async () => {
                        await updatePosts()
                        $goto('/postHome')
                    }}
                >
                    완료하기
                </button>
            </ul>
        {:else}
            <ul>
                <li>
                    <span>수정 제목을 입력하세요: </span><input
                        type="text"
                        bind:value={editedPost.title}
                    />
                </li>
                <li>
                    <span>수정 본문을 입력하세요: </span><input
                        type="text"
                        bind:value={editedPost.content}
                    />
                </li>
                <button
                    class="btn"
                    on:click={async () => {
                        await updatePosts()
                        $goto('/postHome')
                    }}
                >
                    완료하기
                </button>
                <button
                    class="btn"
                    on:click={async () => {
                        await updatePostsAsFalse()
                        $goto('/postHome')
                    }}
                >
                    임시 저장하기
                </button>
            </ul>
        {/if}
    </div>
</header>

<style>
    header {
        width: 100%;
        height: 200px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #14b870;
    }
    header .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 800px;
    }
    .btn {
        padding: 1;
        padding-bottom: 10px;
        color: #070707;
        font-size: 0.8em;
        border: '1px solid #000000';
        margin-left: 0;
        margin-right: 5px;
        text-decoration: none;
        cursor: pointer;
    }
</style>
