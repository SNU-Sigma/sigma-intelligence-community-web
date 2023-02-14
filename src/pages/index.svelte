<script lang="ts">
    import { goto, params } from '@roxi/routify'
</script>

<main>
    <h1>Hello, World!</h1>
    <button class="btn variant-filled-primary">Hello</button>
    <button
        class="btn variant-filled-primary"
        on:click={() => $goto('/profile')}
    >
        Profile
    </button>
</main>
