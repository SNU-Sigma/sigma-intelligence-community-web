import { localStorageStore } from '@skeletonlabs/skeleton'
import type { Readable } from 'svelte/store'

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
    }

    window.resetAPIBaseUrl = () => {
        set(import.meta.env.VITE_API_BASE_URL)
    }

    return {
        subscribe,
    }
})()
