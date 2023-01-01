<script lang="ts">
    import Login from '../lib/login/Login.svelte'

    $: shouldShowLoginPage = true
</script>

{#if shouldShowLoginPage}
    <Login />
{:else}
    <slot />
{/if}
