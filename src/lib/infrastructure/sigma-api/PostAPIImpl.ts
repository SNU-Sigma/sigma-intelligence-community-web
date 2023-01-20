import type { CreatePostDto } from '../../domain/posts/model/CreatePostDto'
import type { PostDto } from '../../domain/posts/model/PostDto'

export const PostAPIImpl = {
    createPost: ({
        title,
        content,
        imageUrls,
    }: CreatePostDto): Promise<PostDto> => {
        // TODO: 실제 API 호출로 변경
        return new Promise((resolve) => {
            resolve({
                id: Math.floor(Math.random() * 1000000),
                title,
                content,
                imageUrls,
                createdAt: new Date().toJSON(),
                updatedAt: new Date().toJSON(),
            })
        })
    },
}
