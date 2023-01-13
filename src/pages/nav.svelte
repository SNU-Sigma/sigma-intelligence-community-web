<script>
    import { url, isActive } from '@roxi/routify'
</script>

<nav class="menu-box">
    <a href={$url('/index')} class:located={$isActive('/index')} class="btn">
        Home
    </a>
    <a
        href={$url('/postHome')}
        class:located={$isActive('/postHome')}
        class="btn"
    >
        Posts
    </a>
    <a
        href={$url('/postMaking')}
        class:located={$isActive('/postMaking')}
        class="btn"
    >
        Add Post
    </a>
</nav>

<style>
    .located {
        border-bottom: 2px solid #005eff;
    }
    nav.menu-box {
        display: flex;
        align-items: flex-end;
        height: 50px;
        padding-left: 40px;
        background-color: #ffffff;
    }
    nav.menu-box a {
        font-size: 1.2rem;
        margin-left: 20px;
    }
    nav.menu-box a.located {
        font-size: 1.2rem;
        margin-left: 20px;
        padding-bottom: 8px;
    }
    nav.menu-box a:hover {
        font-size: 1.2rem;
        margin-left: 20px;
        padding-bottom: 8px;
    }
</style>
