import { localStorageStore } from '@skeletonlabs/skeleton'

type LoginInfo = {
    isLoggedIn: boolean
}

export const LoginInfo$ = (() => {
    const { subscribe, update } = localStorageStore<LoginInfo>('loginInfo', {
        isLoggedIn: false,
    })

    const setIsLoggedIn = (value: boolean) => {
        update((prev) => ({
            ...prev,
            isLoggedIn: value,
        }))
    }

    return {
        subscribe,
        setIsLoggedIn,
    }
})()
