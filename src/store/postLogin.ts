import { writable } from 'svelte/store'

export type loginForm = {
    loginId: string
    loginPw: string
}

function handleCheckLogin() {
    const ableToLogin = false
    const { subscribe, set } = writable(ableToLogin)

    const compareValue = (newLogin: loginForm): void | undefined => {
        if (newLogin.loginPw !== 'pw' || newLogin.loginId !== 'id') {
            window.confirm('wrong id or password')
            set(false)
        } else {
            set(true)
        }
    }
    const logOut = () => {
        set(false)
    }

    return {
        subscribe,
        compareValue,
        logOut,
    }
}

export const checkLogin = handleCheckLogin()
