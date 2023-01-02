<script lang="ts">
    import { derived } from 'svelte/store'
    import Login from '../lib/login/Login.svelte'
    import { LoginInfo$ } from '../lib/login/store/LoginInfo$'

    const shouldShowLoginPage = derived(
        LoginInfo$,
        ({ isLoggedIn }) => isLoggedIn === false,
    )
</script>

{#if $shouldShowLoginPage}
    <Login />
{:else}
    <slot />
{/if}
