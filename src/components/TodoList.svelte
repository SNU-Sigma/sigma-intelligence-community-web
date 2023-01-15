<script>
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate';

    export let fetchTodos
    export let handleCheckTodo

    export let editMode
    export let handleChangeEditMode
    export let handleEditTodoItem
    export let handleRemoveTodo
    export let handleEditTodoItemPublished

    import TodoItem from "./TodoItem.svelte";
</script>

<div class="main">
    <ul>
        {#each fetchTodos as todo, index(todo)}
            <li
                in:fade
                out:fade={{duration:100}}
                animate:flip={{duration:1000}}
            >
                <TodoItem {todo} {handleCheckTodo} {editMode} {handleChangeEditMode} {handleEditTodoItem} {handleRemoveTodo} {handleEditTodoItemPublished}/>
            </li>
        {/each}
    </ul>
</div>