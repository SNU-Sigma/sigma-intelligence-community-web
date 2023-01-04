export const LoginAPIImpl = {
    login: async (email: string, password: string): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })
    },
}
