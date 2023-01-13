import axios from 'axios'
import { derived, writable } from 'svelte/store'

// postmaking part
function changePostMode() {
    const saved = 0
    const { subscribe, update } = writable(saved)
    async function tempSavePost(newPost) {
        newPost.published = false
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        update((datas) => {
            datas = 1
        })
    }
    return {
        subscribe,
        tempSavePost,
    }
}
function notChangePostMode() {
    const saved = 0
    const { subscribe, update } = writable(saved)
    async function realSavePost(newPost) {
        newPost.published = true
        await axios.post(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/create`,
            newPost,
        )
        update((datas) => {
            datas = 1
        })
    }
    return {
        subscribe,
        realSavePost,
    }
}

//post list & item part

function setPostData() {
    const postDatas = []

    const { subscribe, update } = writable(postDatas)

    async function readPostDatas() {
        let tempDatas = []
        await axios
            .get(
                `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/read`,
            )
            .then((response) => {
                tempDatas = response.data.posts
            })
        update((datas) => {
            datas = tempDatas
            return datas
        })
    }

    async function deletePost(postData) {
        const deleteMode = postData.id
        await axios.delete(
            `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/delete/${deleteMode}`,
        )
    }

    return {
        subscribe,
        readPostDatas,
        deletePost,
    }
}

export const postData = setPostData()
export const falseNewPost = changePostMode()
export const trueNewPost = notChangePostMode()
