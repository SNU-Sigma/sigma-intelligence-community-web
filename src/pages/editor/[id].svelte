<script lang="ts">
    import { url, posts, PostDto } from '../../store'
    import axios from 'axios'
    import { params } from '@roxi/routify'
    import { get } from 'svelte/store'

    const id: number = $params.id
    const post: PostDto | undefined = get(posts).find(
        (x) => x.id === Number(id),
    )
    if (post === undefined) {
        throw new Error('wrong id!')
    }

    let title = post.title
    let content = post.content
    let published = post.published
    let sended = false
    let failed = false

    async function changePost(): Promise<void> {
        sended = true
        try {
            const updateResult = await axios.patch(url + '/update/' + id, {
                title: title,
                content: content,
                published: published,
            })
            console.log(updateResult.data)
            posts.updatePost()
        } catch (e) {
            console.error('Post Update failed', e)
            failed = true
        }
    }
</script>

{#if !sended}
    <p>title</p>
    <input type="text" name="title" bind:value={title} />
    <p>content</p>
    <textarea name="content" cols="40" rows="10" bind:value={content} />
    <p />
    <label for="1">published</label>
    <input type="checkbox" id="1" bind:checked={published} />
    <p />
    <button on:click={() => changePost()}>게시물 수정하기</button>
{:else if failed}
    <h1>게시물 수정 실패ㅠㅠ</h1>
{:else}
    <h1>게시물 수정 성공!!</h1>
{/if}
