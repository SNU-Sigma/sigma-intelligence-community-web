import './app.css'
import '@skeletonlabs/skeleton/styles/all.css'
import './theme.postcss'
import './app.postcss'
import axios from 'axios'
import App from './App.svelte'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true
axios.defaults.validateStatus = (status) => status < 400

const app = new App({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    target: document.getElementById('app')!,
})

export default app
