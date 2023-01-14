<script>
    import axios from 'axios'
    import { url, isActive } from '@roxi/routify'
    import { falseNewPost, trueNewPost } from '../store'
    let newPost = {
        title: 'null',
        content: 'null',
        published: true,
    }
</script>

<header>
    <div class="wrap">
        <ul>
            <li>
                <span>제목을 입력하세요: </span><input
                    type="text"
                    bind:value={newPost.title}
                />
            </li>
            <li>
                <span>본문을 입력하세요: </span><input
                    type="text"
                    bind:value={newPost.content}
                />
            </li>

            <a
                href={$url('/postHome')}
                class="btn"
                on:click={() => falseNewPost.tempSavePost(newPost)}
            >
                임시 저장하기
            </a>
            <a
                href={$url('/postHome')}
                class="btn"
                on:click={() => trueNewPost.realSavePost(newPost)}
            >
                완료하기
            </a>
        </ul>
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
        border: none;
        margin-left: 0;
        margin-right: 5px;
        text-decoration: none;
        cursor: pointer;
    }
</style>
