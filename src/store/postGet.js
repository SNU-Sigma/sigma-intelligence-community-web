import axios from 'axios'
import { derived, writable } from 'svelte/store'
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
        if (window.confirm('삭제하시겠습니까?')) {
            await axios.delete(
                `https://example-crud-api-using-next-jihoon416.vercel.app/api/재석/delete/${deleteMode}`,
            )
        }
    }

    return {
        subscribe,
        readPostDatas,
        deletePost,
    }
}

function temporaryPostCount() {
    const tempPostsCount = derived(postData, ($postdata) => {
        const falseposts = $postdata.filter((post) => post.published === false)
        return falseposts.length
    })

    return tempPostsCount
}

function publishedPostCount() {
    const publPostsCount = derived(postData, ($postdata) => {
        const trueposts = $postdata.filter((post) => post.published === true)
        return trueposts.length
    })

    return publPostsCount
}

export const postData = setPostData()
export const tempPostCount = temporaryPostCount()
export const publPostCount = publishedPostCount()
