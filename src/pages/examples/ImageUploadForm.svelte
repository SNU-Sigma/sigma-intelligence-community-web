<script lang="ts">
    import { createImageUpload } from '../../lib/util/createImageUpload'

    let uploadedImageUrl: string | undefined = undefined

    const { files$, validFileTypes, handleUpload } = createImageUpload()

    const handleClick = async () => {
        uploadedImageUrl = await handleUpload()
    }
</script>

<div class="my-auto flex flex-col items-center">
    <input accept={validFileTypes.join(',')} type="file" bind:files={$files$} />
    <button class="btn variant-ghost-primary mt-4" on:click={handleClick}>
        Upload
    </button>
    {#if uploadedImageUrl !== undefined}
        <img src={uploadedImageUrl} alt="이미지" />
    {/if}
</div>
