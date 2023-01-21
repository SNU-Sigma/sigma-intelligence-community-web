import axios from 'axios'
import { writable, derived } from 'svelte/store'
import { uuid } from 'uuidv4'

//type Show = 'F'|'NF';

interface Post {
    id: number
    title: string
    content: string
    published: boolean
}

function setFormpost() {
    const postValue = ''

    const { subscribe, update, set } = writable(postValue)

    const resetForm = () => {
        update((postValue) => {
            postValue = ''
            return postValue
        })
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
    let postLists: Post[] = readResult.data

    const { subscribe, update } = writable(postLists)

    const addPost = (title, content, published) => {
        if (title && content && published) {
            const newPost: Post[] = [
                {
                    id: uuid(),
                    title: title,
                    content: content,
                    published: published,
                },
            ]

            update((datas) => {
                const setData = [...postLists, ...newPost]
                postLists = setData
                return datas
            })
        }
    }
    const editPost = (editPost) => {
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
    const removePost = (id) => {
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
export const posts = setPostData()
export const fetchPosts = setFetchPosts()
export const countTodo = setCountPost()
