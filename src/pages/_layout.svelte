<script>
    import Nav from './nav.svelte'
</script>

<Nav />

<div class="app">
    <slot />
</div>

<style>
    .app {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
</style>
