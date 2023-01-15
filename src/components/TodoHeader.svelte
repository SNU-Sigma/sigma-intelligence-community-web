<script>
    export let todoValue
    export let handleTodoInput
    export let handleTodoInputPublished
</script>

<header>
    <div class="wrap">
        <h1>내가 작성한 게시물 관리하기</h1>
        <input type="text" bind:value={todoValue}>
        <span>
            <button on:click={handleTodoInput}>임시저장</button>
            <button on:click={handleTodoInputPublished}>정식 게시글</button>
        </span>
    </div>
</header>