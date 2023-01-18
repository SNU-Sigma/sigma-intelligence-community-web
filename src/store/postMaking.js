import axios from 'axios'
import { writable } from 'svelte/store'

// postmaking part
export const publNewPost = (() => {
    const saved = false
    const { subscribe, update } = writable(saved)

    async function publSavePost(newPost) {
        newPost.published = true
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        update((datas) => {
            datas = true
        })
    }

    return {
        subscribe,
        publSavePost,
    }
})()
export const tempNewPost = (() => {
    const saved = false
    const { subscribe, update } = writable(saved)

    async function tempSavePost(newPost) {
        newPost.published = false
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        update((datas) => {
            datas = true
        })
    }

    return {
        subscribe,
        tempSavePost,
    }
})()
