<script lang="ts">
    import { isActive, url } from '@roxi/routify'
    import HomeActiveIcon from '../../../assets/images/home_active.svg'
    import HomeDefaultIcon from '../../../assets/images/home_default.svg'
    import MyPageActiveIcon from '../../../assets/images/mypage_active.svg'
    import MyPageDefaultIcon from '../../../assets/images/mypage_default.svg'
    import PrinterActiveIcon from '../../../assets/images/printer_active.svg'
    import PrinterDefaultIcon from '../../../assets/images/printer_default.svg'

    const config = [
        {
            path: '/post',
            logoActiveVariantUrl: HomeActiveIcon,
            logoDefaultVariantUrl: HomeDefaultIcon,
        },
        {
            path: '/printer',
            logoActiveVariantUrl: PrinterActiveIcon,
            logoDefaultVariantUrl: PrinterDefaultIcon,
        },
        {
            path: '/my-page',
            logoActiveVariantUrl: MyPageActiveIcon,
            logoDefaultVariantUrl: MyPageDefaultIcon,
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
                alt={path}
                class="mx-auto my-auto h-8 w-8"
            />
        </a>
    {/each}
</div>
