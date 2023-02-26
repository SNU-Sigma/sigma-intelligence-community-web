import axios from 'axios'
import type { CreatePostDto } from '../../domain/posts/model/CreatePostDto'
import type { PostFeedDto } from '../../domain/posts/model/PostFeedDto'
import type { PostDto } from '../../domain/posts/model/PostDto'
export const PostAPIImpl = {
    createPost: async ({
        title,
        description,
        images,
    }: CreatePostDto): Promise<PostDto> => {
        const { data } = await axios.post('/posts', {
            title,
            description,
            images,
        })
        return data
    },
    fetchAllPosts: async (): Promise<Array<PostFeedDto>> => {
        const { data } = await axios.get('/posts/all-posts')
        return data
    },
    deletePost: async (postId: PostDto['id']): Promise<void> => {
        await axios.delete(`/posts/${postId}`)
    },
}
