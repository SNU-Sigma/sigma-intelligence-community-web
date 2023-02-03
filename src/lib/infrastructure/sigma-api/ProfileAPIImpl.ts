import type { ProfileDto } from '../../domain/profile/model/ProfileDto'

export const ProfileAPIImpl = {
    getMyProfile: async (): Promise<ProfileDto> => {
        // TODO: 실제 API로 변경
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: '아무개',
                    freshmanYear: 22,
                    major: '전기정보공학부',
                    profileImageUrl: 'https://picsum.photos/600',
                })
            }, 3000)
        })
    },
}
