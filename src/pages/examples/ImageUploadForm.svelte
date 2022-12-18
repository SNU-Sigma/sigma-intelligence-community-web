<script lang="ts">
    import { createImageUpload } from '../../lib/util/createImageUpload'

    let uploadedImageUrl: string | undefined = undefined

    const { files$, validFileTypes, handleUpload } = createImageUpload()

    const handleClick = async () => {
        uploadedImageUrl = await handleUpload()
    }
</script>

<main>
    <div class="container">
        <input
            accept={validFileTypes.join(',')}
            type="file"
            bind:files={$files$}
        />
        <button on:click={handleClick}>Upload</button>
        {#if uploadedImageUrl !== undefined}
            <img src={uploadedImageUrl} alt="이미지" />
        {/if}
    </div>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
</style>
