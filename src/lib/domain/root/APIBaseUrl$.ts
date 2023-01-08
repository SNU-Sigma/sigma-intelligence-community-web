import { localStorageStore } from '@skeletonlabs/skeleton'
import type { Readable } from 'svelte/store'
import { LoginInfo$ } from '../login/LoginInfo$'

declare global {
    interface Window {
        setAPIBaseUrl: (newUrl: string) => void
        resetAPIBaseUrl: () => void
    }
}

export const APIBaseUrl$: Readable<string> = (() => {
    const { subscribe, set } = localStorageStore<string>(
        'apiBaseUrl',
        import.meta.env.VITE_API_BASE_URL,
    )

    window.setAPIBaseUrl = (newUrl) => {
        set(newUrl)
        LoginInfo$.setIsLoggedIn(false)
    }

    window.resetAPIBaseUrl = () => {
        set(import.meta.env.VITE_API_BASE_URL)
        LoginInfo$.setIsLoggedIn(false)
    }

    return {
        subscribe,
    }
})()
