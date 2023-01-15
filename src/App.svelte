<script>
    import { v4 as uuid } from 'uuid'
    import Constant from './constant'
    import TodoList from './components/TodoList.svelte'
    import TodoHeader from './components/TodoHeader.svelte'
    import TodoInfo from './components/TodoInfos.svelte'

    let todoValue = ''

    let editMode = ''

    let viewMode = Constant.ALL

    $: todoCount = fetchTodos.length

    $: if(viewMode === Constant.ALL) {
        fetchTodos = todos
    }

    $: if(viewMode === Constant.ACTIVE) {
        fetchTodos = todos.filter(todo => todo.done === false)
    }

    $: if(viewMode === Constant.DONE) {
        fetchTodos = todos.filter(todo => todo.done === true)
    }

    let todos = [
        {
            id: uuid(),
            title: '첫 번째 게시글',
            content: '이러쿵 저러쿵',
            done: true
        },
        {
            id: uuid(),
            title: '두 번째 게시글',
            content: '이러쿵 저러쿵',
            done: true
        },
        {
            id: uuid(),
            title: '세 번째 게시글',
            content: '이러쿵 저러쿵',
            done: false
        },
        {
            id: uuid(),
            title: '네 번째 게시글',
            content: '이러쿵 저러쿵',
            done: false
        }
    ]

    $: fetchTodos = todos

    function handleCheckTodo(id) {
        todos = todos.map(todo => {
            if(todo.id === id) {
                todo.done = !todo.done
            }
            return todo
        })
    }

    function handleTodoInputPublished(event) {
        if(event) {
            addTodoItemPublished()
        }
    }

    function handleTodoInput(event) {
        if(event) {
            addTodoItem()
        }
    }

    function addTodoItemPublished() {
        if(todoValue) {
            const newTodo = {
                id:uuid(),
                title:todoValue,
                done:true
            }
            todos = [...todos, newTodo]
            todoValue = ''
        }
    }

    function addTodoItem() {
        if(todoValue) {
            const newTodo = {
                id:uuid(),
                title:todoValue,
                done:false
            }
            todos = [...todos, newTodo]
            todoValue = ''
        }
    }

    function handleChangeEditMode(id) {
        editMode = id
    }

    function handleEditTodoItem(editTodo) {
        todos = todos.map(todo => {
            if(todo.id === editTodo.id) {
                todo = editTodo
            }
            return todo
        })
        editMode = ''
    }

    function handleEditTodoItemPublished(editTodo) {
        todos = todos.map(todo => {
            if(todo.id === editTodo.id) {
                todo = editTodo
                todo.done = !todo.done
            }
            return todo
        })
        editMode = ''
    }

    function handleRemoveTodo(id) {
        let check = confirm('정말 삭제하시겠습니까?')
        
        if(check) {
           todos = todos.filter(todo => todo.id !== id) 
        }
    }

    function handleChangeViewMode(mode) {
        viewMode = mode
    }

</script>

<div class="app">
    <TodoHeader bind:todoValue={todoValue} {handleTodoInput} {handleTodoInputPublished}/>
    <TodoInfo {todoCount} {handleChangeViewMode} {viewMode}/>
    <TodoList {fetchTodos} {handleCheckTodo} {editMode} {handleChangeEditMode} {handleEditTodoItem} {handleEditTodoItemPublished} {handleRemoveTodo}/>
</div>