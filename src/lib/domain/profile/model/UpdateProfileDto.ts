import type { UserProfile } from '../../common/model/UserProfile'

export type UpdateProfileDto = Partial<Omit<UserProfile, 'name'>>
