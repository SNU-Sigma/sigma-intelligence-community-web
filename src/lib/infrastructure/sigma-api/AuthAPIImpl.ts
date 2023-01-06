import axios from 'axios'

export const AuthAPIImpl = {
    login: async (email: string, password: string): Promise<void> => {
        await axios.post('/auth/login', {
            email,
            password,
        })
    },
}
