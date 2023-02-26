import axios from 'axios'
import type { User } from '../../domain/common/model/User'
import type { UserProfile } from '../../domain/common/model/UserProfile'
import type { UpdateProfileDto } from '../../domain/profile/model/UpdateProfileDto'

export const ProfileAPIImpl = {
    getMyProfile: async (): Promise<UserProfile> => {
        const { data } = await axios.get<User>('/users/my')
        return data.profile
    },
    updateMyProfile: async ({
        profileImageUrl,
        major,
        freshmanYear,
    }: UpdateProfileDto): Promise<UserProfile> => {
        const { data } = await axios.patch<User>('/users/my', {
            profileImageUrl,
            major,
            freshmanYear,
        })
        return data.profile
    },
}
