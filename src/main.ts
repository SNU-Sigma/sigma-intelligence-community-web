import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
import '@skeletonlabs/skeleton/styles/all.css'
import './app.postcss'
import axios from 'axios'
import App from './App.svelte'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const app = new App({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    target: document.getElementById('app')!,
})

export default app
