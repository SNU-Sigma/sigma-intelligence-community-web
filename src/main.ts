import './app.css'
import '@skeletonlabs/skeleton/styles/all.css'
import './theme.postcss'
import './app.postcss'
import axios from 'axios'
import App from './App.svelte'
import { LoginInfo$ } from './lib/domain/login/LoginInfo$'
import { toastStore } from '@skeletonlabs/skeleton'
import { APIBaseUrl$ } from './lib/domain/root/APIBaseUrl$'

APIBaseUrl$.subscribe((url) => {
    axios.defaults.baseURL = url
})
axios.defaults.withCredentials = true
axios.defaults.validateStatus = (status) => status < 400
axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        LoginInfo$.setIsLoggedIn(false)
        toastStore.trigger({
            message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
            preset: 'error',
        })
    }
    return Promise.reject(error)
})

const app = new App({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    target: document.getElementById('app')!,
})

export default app
