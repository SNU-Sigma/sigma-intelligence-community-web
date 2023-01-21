import axios from 'axios'
import { writable, derived } from 'svelte/store'

interface Post {
    id: number
    title: string
    content: string
    published: boolean
}

function setFormpost() {
    const postValue = ''

    const { subscribe, set } = writable(postValue)

    const resetForm = () => {
        set('')
    }

    return {
        subscribe,
        set,
        resetForm,
    }
}

async function setPostData() {
    const member = '승연'

    const readResult = await axios.get(
        `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/read`,
    )
    let postLists: Post[] = readResult.data.posts

    const { subscribe, update } = writable(postLists)

    const addPost = async (
        title: string,
        content: string,
        published: boolean,
    ) => {
        if (title && content && published) {
            const createResult = await axios.post(
                `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/create`,
                {
                    title,
                    content,
                    published,
                },
            )
            const newPost: Post[] = [createResult.data.post]
            update((datas) => {
                const setData = [...datas, ...newPost]
                return setData
            })
        }
    }
    const editPost = (editPost: Post) => {
        update((datas) => {
            const setData = postLists.map((post) => {
                if (post.id === editPost.id) {
                    post = editPost
                }
                return post
            })
            postLists = setData
            return datas
        })
    }
    const removePost = (id: number) => {
        update((datas) => {
            const setData = postLists.filter((todo) => todo.id !== id)
            postLists = setData
            return datas
        })
    }

    return {
        subscribe,
        addPost,
        editPost,
        removePost,
    }
}

function setFetchPosts() {
    const fetch = derived(posts, ($posts) => {
        return $posts
    })

    return fetch
}

function setCountPost() {
    const count = derived(fetchPosts, ($fetchPosts) => {
        return $fetchPosts.length
    })
    return count
}

export const postForm1 = setFormpost()
export const postForm2 = setFormpost()
export const posts = await setPostData()
export const fetchPosts = setFetchPosts()
export const countTodo = setCountPost()
