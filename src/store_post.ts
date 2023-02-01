import axios from 'axios'
import { writable, derived } from 'svelte/store'

export interface Post {
    id: number
    title?: string
    content?: string
    published?: boolean
}

async function setPostData() {
    const member = '승연'

    const readResult = await axios.get(
        `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/read`,
    )

    const { subscribe, update } = writable(readResult.data.posts as Post[])

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
            const newPost: Post = createResult.data.post
            update((datas) => {
                return [...datas, newPost]
            })
        }
    }

    const editPost = async (editPost: Post) => {
        const updateResult = await axios.patch(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/update/${editPost.id}`,
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
    const removePost = async (removeid: number) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            await axios.delete(
                `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}/delete/${removeid}`,
            )
            update((datas) => {
                const setData = datas.filter((post) => post.id !== removeid)
                return setData
            })
        }
    }

    return {
        subscribe,
        addPost,
        editPost,
        removePost,
    }
}

function setCountPost() {
    const count = derived(fetchPosts, ($fetchPosts) => {
        return $fetchPosts.length
    })
    return count
}

export const posts = await setPostData()
export const fetchPosts = derived(posts, ($posts) => {
    return $posts
})
export const countTodo = setCountPost()
