import axios from 'axios'
import { writable, derived } from 'svelte/store'

interface Post {
    id: number
    title?: string
    content?: string
    published?: boolean
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
        if (title && content) {
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
    const editPost = async (editPost: Post) => {
        const updateResult = await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/update`,
            {
                title: editPost.title,
                content: editPost.content,
                published: editPost.published,
            },
        )
        update((datas) => {
            const setData = datas.map((post) => {
                if (post.id === editPost.id) {
                    post = updateResult.data.post
                }
                return post
            })
            return setData
        })
    }
    const removePost = async () => {
        const deleteResult = await axios.delete(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/delete`,
        )
        update((datas) => {
            const setData = postLists.filter(
                (post) => post.id !== deleteResult.data.post.id,
            )
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
