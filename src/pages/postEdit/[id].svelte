<script>
    import { params } from '@roxi/routify'
    import axios from 'axios'
    import { postData } from '../../store'
    import { onMount } from 'svelte'

    let editMode = 0
    let editPublishedMode = true
    let editedPost = {
        title: '',
        content: '',
        published: true,
    }

    async function updatePosts() {
        editedPost.published = true
        await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/update/${editMode}`,
            editedPost,
        )
        resetPost()
    }
    async function updatePostsAsFalse() {
        editedPost.published = false
        console.log('working')
        await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/update/${editMode}`,
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
    editMode = $params.id
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
                <button on:click={updatePosts}>완료하기</button>
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
                <button on:click={updatePosts}>완료하기</button>
                <button on:click={updatePostsAsFalse}>임시저장하기</button>
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
</style>
