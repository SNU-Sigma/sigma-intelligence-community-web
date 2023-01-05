import axios from 'axios'
import { get, writable } from 'svelte/store'

export const createImageUpload = () => {
    const files$ = writable<FileList | undefined>(undefined)

    const validFileTypes = ['image/jpeg', 'image/png']

    const handleUpload = async (): Promise<string | undefined> => {
        for (const file of get(files$) ?? []) {
            if (validFileTypes.includes(file.type)) {
                try {
                    const {
                        data: { url, uploadedUrl },
                    } = await axios.get(
                        `/images/pre-signed-url?fileName=${file.name}`,
                    )
                    await axios.put(url, file, {
                        withCredentials: false,
                    })
                    return uploadedUrl
                } catch (e) {
                    console.error('Upload failed', e)
                }
            } else {
                console.error('Not valid file')
            }
        }
    }

    return { files$, validFileTypes, handleUpload }
}
