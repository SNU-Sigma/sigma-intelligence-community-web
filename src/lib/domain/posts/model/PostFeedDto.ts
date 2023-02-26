import type { User } from '../../common/model/User'

export type PostFeedDto = {
    user: User
    isMyPost: boolean
    id: number
    createdAt: string
    updatedAt: string
    title: string
    description: string
    images: Array<string>
    userId: number
}
