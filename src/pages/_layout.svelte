<script lang="ts">
    import { Toast } from '@skeletonlabs/skeleton'
    import { derived } from 'svelte/store'
    import Login from '../lib/ui/login/Login.svelte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { isActive } from '@roxi/routify'

    const shouldShowLoginPage = derived(
        [LoginInfo$, isActive],
        ([{ isLoggedIn }, isActiveHelper]) => {
            const isInSetPasswordPage = isActiveHelper('setPassword')
            const isInSignUpPage = isActiveHelper('signUp')
            return (
                isLoggedIn === false &&
                isInSetPasswordPage === false &&
                isInSignUpPage === false
            )
        },
    )
</script>

<!-- routify:options preload="proximity" -->
<div class="relative mx-auto h-screen max-w-md bg-gray-50 dark:bg-gray-900">
    <Toast />
    <div class="grid h-full w-full overflow-y-auto">
        {#if $shouldShowLoginPage}
            <Login />
        {:else}
            <slot />
        {/if}
    </div>
</div>
