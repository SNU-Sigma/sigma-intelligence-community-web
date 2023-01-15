<script>
    export let todo
    export let handleCheckTodo
    export let editMode
    export let handleChangeEditMode
    export let handleEditTodoItem
    export let handleRemoveTodo
    export let handleEditTodoItemPublished
</script>

{#if editMode === todo.id}

    {#if todo.done === true}
    <input type="text" bind:value={todo.content}>
    <button on:click={() => handleEditTodoItem(todo)}>수정완료</button>
    {:else}
    <input type="text" class="tempPublished" bind:value={todo.content}>
    <button on:click={() => handleEditTodoItem(todo)}>임시저장하기</button>
    <button on:click={() => handleEditTodoItemPublished(todo)}>완료하기</button>
    {/if}

{:else}

    {#if todo.done === true}
    <span>{todo.title}</span>
    <button on:click={() => handleChangeEditMode(todo.id)}>수정하기</button>
    {:else}
    <span class="tempPublished" on:dblclick={() => handleChangeEditMode(todo.id)}>{todo.title}[임시저장 게시물]</span>
    <button on:click={() => handleChangeEditMode(todo.id)}>수정하기</button>
    {/if}
    
{/if}

<a href="#null" on:click={() => handleRemoveTodo(todo.id)}>X</a>

<style>
    .tempPublished {
        opacity: 0.5;
    }
</style>