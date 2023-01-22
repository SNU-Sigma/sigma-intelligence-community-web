<script lang="ts">
    import { url, isActive } from '@roxi/routify'
    //let id='123'
</script>

<nav class="menu-box">
    <a href={$url('/Post')} class:located={$isActive('/Post')} class="btn">
        MAIN</a
    >
</nav>

<style>
    .located {
        border-bottom: 2px solid #005eff;
    }
</style>
