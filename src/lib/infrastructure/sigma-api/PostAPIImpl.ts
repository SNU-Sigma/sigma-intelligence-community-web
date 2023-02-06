import axios from 'axios'
import type { CreatePostDto } from '../../domain/posts/model/CreatePostDto'
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
}
