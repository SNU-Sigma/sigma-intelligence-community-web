<script lang="ts">
    export let file: File

    let image: HTMLImageElement

    const reader = new FileReader()
    reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
            image.setAttribute('src', reader.result)
        }
    })

    $: reader.readAsDataURL(file)
</script>

<img bind:this={image} alt="Preview" class="h-44 w-44 object-cover" />
