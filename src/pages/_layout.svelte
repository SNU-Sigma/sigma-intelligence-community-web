<script lang="ts">
    import { url } from '@roxi/routify'
</script>

<div class="title">
    게시물 관리하기 by duhwan
    <nav>
        <a href={$url('/')} class="btn">Home</a>
        <a href={$url('/editor')} class="btn">New</a>
        <a href={$url('/examples/ImageUploadForm')} class="btn">ImageUpload</a>
    </nav>
</div>

<div class="app">
    <slot />
</div>
