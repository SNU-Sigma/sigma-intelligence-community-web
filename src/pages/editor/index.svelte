<script lang="ts">
    import { url, posts } from '../../store'
    import axios from 'axios'

    let title = ''
    let content = ''
    let published = false
    let sended = false
    let failed = false

    async function createPost(): Promise<void> {
        sended = true
        try {
            const createResult = await axios.post(url + '/create', {
                title: title,
                content: content,
                published: published,
            })
            console.log(createResult.data)
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
    <button on:click={() => createPost()}>게시물 생성하기</button>
{:else if failed}
    <h1>게시물 생성 실패ㅠㅠ</h1>
{:else}
    <h1>게시물 생성 성공!!</h1>
{/if}
