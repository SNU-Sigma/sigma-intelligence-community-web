<script lang="ts">
    import { isActive } from '@roxi/routify'
    import { Toast } from '@skeletonlabs/skeleton'
    import { derived } from 'svelte/store'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import Login from '../lib/ui/login/Login.svelte'

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
<div
    class="relative mx-auto flex min-h-screen max-w-md flex-1 flex-col bg-gray-50 dark:bg-gray-900"
>
    <Toast />
    {#if $shouldShowLoginPage}
        <Login />
    {:else}
        <slot />
    {/if}
</div>
