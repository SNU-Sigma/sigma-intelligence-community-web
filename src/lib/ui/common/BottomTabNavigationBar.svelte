<script lang="ts">
    import { isActive, url } from '@roxi/routify'
    import HomeActiveIcon from '../../../assets/images/home_active.svg'
    import HomeDefaultIcon from '../../../assets/images/home_default.svg'
    import MyPageActiveIcon from '../../../assets/images/my_page_active.svg'
    import MyPageDefaultIcon from '../../../assets/images/my_page_default.svg'
    import PrinterActiveIcon from '../../../assets/images/printer_active.svg'
    import PrinterDefaultIcon from '../../../assets/images/printer_default.svg'

    const config = [
        {
            path: '/feed',
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
        logoActiveVariantUrl: string
        logoDefaultVariantUrl: string
    }>
</script>

<nav class="flex h-16 w-full flex-shrink-0">
    <div
        class="fixed bottom-0 z-50 flex h-16 w-full max-w-md flex-row bg-gray-50 dark:bg-gray-900"
    >
        {#each config as { path, logoActiveVariantUrl, logoDefaultVariantUrl } (path)}
            <a class="flex flex-1" href={$url(path)}>
                <img
                    src={$isActive(path)
                        ? logoActiveVariantUrl
                        : logoDefaultVariantUrl}
                    alt={path}
                    class="mx-auto my-auto h-8 w-8"
                />
            </a>
        {/each}
    </div>
</nav>
