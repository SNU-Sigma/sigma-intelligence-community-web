import type { UserProfile } from './UserProfile'
import type { UserRole } from './UserRole'

export type User = {
    email: string
    role: UserRole
    profile: UserProfile
}
