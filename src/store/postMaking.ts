import axios from 'axios'
import { writable } from 'svelte/store'

export type PostItem = {
    id?: number
    title: string
    content: string
    published: boolean
    updatedAt?: string
    createdAt?: string
}

// postmaking part
export const publNewPost = (() => {
    const saved = false
    const { subscribe, set } = writable(saved)

    async function publSavePost(newPost: PostItem) {
        newPost.published = true
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        set(true)
    }

    return {
        subscribe,
        publSavePost,
    }
})()
export const tempNewPost = (() => {
    const saved = false
    const { subscribe, set } = writable(saved)

    async function tempSavePost(newPost: PostItem) {
        newPost.published = false
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        set(true)
    }

    return {
        subscribe,
        tempSavePost,
    }
})()
