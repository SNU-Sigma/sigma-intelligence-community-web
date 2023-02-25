import axios from 'axios'
import { get, writable } from 'svelte/store'

export const createImageUpload = () => {
    const files$ = writable<FileList>(undefined)

    const validFileTypes = ['image/jpeg', 'image/png']

    const uploadImage = async (file: File) => {
        if (validFileTypes.includes(file.type)) {
            try {
                const {
                    data: { url, uploadedUrl },
                } = await axios.get(
                    `/images/pre-signed-url?fileName=${file.name}`,
                )
                await axios.put(url, file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                    withCredentials: false,
                })
                return uploadedUrl
            } catch (e) {
                console.error('Upload failed', e)
                throw new Error('업로드 실패')
            }
        } else {
            console.error('Not valid file')
            throw new Error('지원되지 않는 파일 형식')
        }
    }

    const handleUpload = async () => {
        return Promise.all(
            Array.from(get(files$)).map(async (file) => {
                const imageUrl = await uploadImage(file)
                return imageUrl
            }),
        )
    }

    const handleMultiUpload = handleUpload

    return { files$, validFileTypes, handleUpload, handleMultiUpload }
}
