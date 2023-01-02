<script lang="ts">
    import { derived } from 'svelte/store'
    import Login from '../lib/login/Login.svelte'
    import { LoginInfo$ } from '../lib/login/store/LoginInfo$'

    const shouldShowLoginPage = derived(
        LoginInfo$,
        ({ isLoggedIn }) => isLoggedIn === false,
    )
</script>

<div class="flex items-center justify-center h-screen w-96 m-auto">
    {#if $shouldShowLoginPage}
        <Login />
    {:else}
        <slot />
    {/if}
</div>
