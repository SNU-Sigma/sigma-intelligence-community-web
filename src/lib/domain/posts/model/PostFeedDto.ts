export type PostFeedDto = {
    user: {
        id: number
        email: string
        role: unknown
        userAuthId: number
        profileId: number
        profile: {
            id: number
            name: string
        }
    }
    isMyPost: boolean
    id: number
    createdAt: string
    updatedAt: string
    title: string
    description: string
    images: Array<string>
    userId: number
}
