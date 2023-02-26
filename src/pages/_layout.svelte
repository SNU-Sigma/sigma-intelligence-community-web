<script lang="ts">
    import { isActive } from '@roxi/routify'
    import { Toast } from '@skeletonlabs/skeleton'
    import { derived } from 'svelte/store'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import Login from '../lib/ui/login/Login.svelte'

    const setInitialClassState = () => {
        const elemHtmlClasses = document.documentElement.classList
        // Conditions
        const condLocalStroageUserPrefs: boolean =
            localStorage.getItem('modeUserPrefers') === 'false'
        const condLocalStroageUserPrefsExists = !(
            'modeUserPrefers' in localStorage
        )
        const condMatchMedia: boolean = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches
        // Add/remove `.dark` class to HTML element
        if (
            condLocalStroageUserPrefs ||
            (condLocalStroageUserPrefsExists && condMatchMedia)
        ) {
            elemHtmlClasses.add('dark')
        } else {
            elemHtmlClasses.remove('dark')
        }
    }
    // FIXME: @skeletonlabs/skeleton의 버전이 올라가면 @skeletonlabs/skeleton 직접 써야하거나, 아예 안 써도 될 수 있음
    // https://github.com/skeletonlabs/skeleton/issues/905#issuecomment-1445231511
    setInitialClassState()

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
