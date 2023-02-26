<script lang="ts">
    import { isActive, url } from '@roxi/routify'
    import type { ComponentType } from 'svelte'
    import HomeActiveIcon from '../../../assets/images/home_active.svg?component'
    import HomeDefaultIcon from '../../../assets/images/home_default.svg?component'
    import MyPageActiveIcon from '../../../assets/images/my_page_active.svg?component'
    import MyPageDefaultIcon from '../../../assets/images/my_page_default.svg?component'
    import PrinterActiveIcon from '../../../assets/images/printer_active.svg?component'
    import PrinterDefaultIcon from '../../../assets/images/printer_default.svg?component'

    const config = [
        {
            path: '/index',
            logoActiveVariantUrl: HomeActiveIcon,
            logoDefaultVariantUrl: HomeDefaultIcon,
        },
        {
            path: '/printer-calendar',
            logoActiveVariantUrl: PrinterActiveIcon,
            logoDefaultVariantUrl: PrinterDefaultIcon,
        },
        {
            path: '/profile',
            logoActiveVariantUrl: MyPageActiveIcon,
            logoDefaultVariantUrl: MyPageDefaultIcon,
        },
    ] satisfies Array<{
        path: string
        logoActiveVariantUrl: ComponentType
        logoDefaultVariantUrl: ComponentType
    }>
</script>

<nav class="flex h-16 w-full flex-shrink-0">
    <div
        class="fixed bottom-0 z-50 flex h-16 w-full max-w-md flex-row bg-gray-50 dark:bg-gray-900"
    >
        {#each config as { path, logoActiveVariantUrl, logoDefaultVariantUrl } (path)}
            <a class="flex flex-1" href={$url(path)}>
                <svelte:component
                    this={$isActive(path)
                        ? logoActiveVariantUrl
                        : logoDefaultVariantUrl}
                    class="mx-auto my-auto h-8 w-8 dark:invert"
                />
            </a>
        {/each}
    </div>
</nav>
