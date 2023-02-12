<script lang="ts">
    import { isActive, url } from '@roxi/routify'

    const config = [
        {
            path: '/post',
            logoActiveVariantUrl: 'https://picsum.photos/20',
            logoDefaultVariantUrl: 'https://picsum.photos/20',
        },
        {
            path: '/printer',
            logoActiveVariantUrl: 'https://picsum.photos/20',
            logoDefaultVariantUrl: 'https://picsum.photos/20',
        },
        {
            path: '/my-page',
            logoActiveVariantUrl: 'https://picsum.photos/20',
            logoDefaultVariantUrl: 'https://picsum.photos/20',
        },
    ] satisfies Array<{
        path: string
        logoActiveVariantUrl: string
        logoDefaultVariantUrl: string
    }>
</script>

<div class="flex h-16 w-full flex-row">
    {#each config as { path, logoActiveVariantUrl, logoDefaultVariantUrl } (path)}
        <a class="flex flex-1" href={$url(path)}>
            <img
                src={$isActive(path)
                    ? logoActiveVariantUrl
                    : logoDefaultVariantUrl}
                alt="Post"
                class="mx-auto my-auto"
            />
        </a>
    {/each}
</div>
