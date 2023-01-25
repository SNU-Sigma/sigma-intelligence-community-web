import axios from 'axios'
import { derived, writable } from 'svelte/store'
//post list & item part

export type PostItem = {
    id: number
    title: string
    content: string
    published: boolean
    updatedAt: string
    createdAt: string
}

function setPostData() {
    const postDatas: PostItem[] = []

    const { subscribe, update } = writable(postDatas)

    async function readPostDatas() {
        let tempDatas: PostItem[] = []
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

    async function deletePost(postData: PostItem): Promise<void> {
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
        const falseposts: Array<PostItem> = $postdata.filter(
            (post) => post.published === false,
        )
        return falseposts.length
    })

    return tempPostsCount
}

function publishedPostCount() {
    const publPostsCount = derived(postData, ($postdata) => {
        const trueposts: Array<PostItem> = $postdata.filter(
            (post) => post.published === true,
        )
        return trueposts.length
    })

    return publPostsCount
}

export const postData = setPostData()
export const tempPostCount = temporaryPostCount()
export const publPostCount = publishedPostCount()
