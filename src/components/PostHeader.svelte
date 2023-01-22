<script lang="ts">
    import { goto } from '@roxi/routify'
</script>

<header class="header">
    <div class="wrap" style="text-align:center">
        <h1 class="main-title">SVELTE POST</h1>
        <button class="bu" on:click={() => $goto('/write')}>WRITE POST</button>
    </div>
</header>

<style>
    .header {
        background-color: pink;
        color: black;
        padding: 20px;
    }
    .bu {
        display: inline-block;
    }
</style>
