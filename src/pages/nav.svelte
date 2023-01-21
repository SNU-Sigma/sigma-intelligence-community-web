<script lang="ts">
    import { url, isActive } from '@roxi/routify'
    //let id='123'
</script>

<nav class="menu-box">
    <a href={$url('/index')} class:located={$isActive('/index')} class="btn">
        Home</a
    >
    <a href={$url('/Post')} class:located={$isActive('/Post')} class="btn">
        Posts</a
    >
</nav>

<style>
    .located {
        border-bottom: 2px solid #005eff;
    }
</style>
