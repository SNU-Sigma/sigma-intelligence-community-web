import axios from 'axios'
import { get, writable } from 'svelte/store'

export const createImageUpload = () => {
    const files$ = writable<FileList>(undefined)

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

    const handleMultiUpload = async (): Promise<Array<string>> => {
        const multiUploadedUrl: Array<string> = []
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
                    multiUploadedUrl.push(uploadedUrl)
                } catch (e) {
                    console.error('Upload failed', e)
                }
            } else {
                console.error('Not valid file')
            }
        }
        return multiUploadedUrl
    }

    return { files$, validFileTypes, handleUpload, handleMultiUpload }
}
