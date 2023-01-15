import { writable } from 'svelte/store'
import axios from 'axios'

export class PostDto {
    id: number
    title: string
    content: string
    published: boolean
    updatedAt: string
    createdAt: string
}
export class PostsDto {
    data: {
        posts: PostDto[]
    }
    status: number
    statusText: string
    headers: Headers
}

const member = '두환'
export const url = `https://example-crud-api-using-next-jihoon416.vercel.app/api/${member}`

function setPostData() {
    const { subscribe, set } = writable<PostDto[]>([])

    const updatePost = async (): Promise<void> => {
        try {
            const newData: PostsDto = await axios.get(url + '/read')
            set(newData.data.posts)
        } catch (e) {
            console.error('Post Update failed', e)
        }
    }

    return {
        subscribe,
        updatePost,
    }
}

export const posts = setPostData()
