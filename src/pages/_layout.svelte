<script lang="ts">
    import { Toast } from '@skeletonlabs/skeleton'
    import { derived } from 'svelte/store'
    import Login from '../lib/ui/login/Login.svelte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { isActive } from '@roxi/routify'
    import BottomTabNavigationBar from '../lib/ui/home/BottomTabNavigationBar.svelte'

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
    class="relative mx-auto flex max-w-md flex-col bg-gray-50 dark:bg-gray-900"
>
    <Toast />
    <div class="grid w-full flex-shrink flex-grow">
        {#if $shouldShowLoginPage}
            <Login />
        {:else}
            <slot />
        {/if}
    </div>
    <BottomTabNavigationBar />
</div>
