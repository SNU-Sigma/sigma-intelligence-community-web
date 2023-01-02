import { localStorageStore } from '@skeletonlabs/skeleton'

type LoginInfo = {
    isLoggedIn: boolean
}

export const LoginInfo$ = localStorageStore<LoginInfo>('loginInfo', {
    isLoggedIn: false,
})
