<script lang="ts">
    import { LightSwitch, Toast } from '@skeletonlabs/skeleton'
    import { derived } from 'svelte/store'
    import Login from '../lib/ui/login/Login.svelte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { isActive } from '@roxi/routify'

    const shouldShowLoginPage = derived(
        [LoginInfo$, isActive],
        ([{ isLoggedIn }, isActiveHelper]) => {
            const isInSetPasswordPage = isActiveHelper('setPassword')
            return isLoggedIn === false && isInSetPasswordPage === false
        },
    )
</script>

<div
    class="relative flex items-center justify-center h-screen max-w-md mx-auto bg-gray-50 dark:bg-gray-900"
>
    <Toast />
    <div class="absolute bottom-4 left-4">
        <LightSwitch />
    </div>
    {#if $shouldShowLoginPage}
        <Login />
    {:else}
        <slot />
    {/if}
</div>
