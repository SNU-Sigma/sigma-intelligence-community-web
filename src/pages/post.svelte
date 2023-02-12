<script>
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import BottomTabNavigationBar from '../lib/ui/home/BottomTabNavigationBar.svelte'
</script>

<div class="flex flex-col">
    <div class="relative flex flex-1 bg-pink-400">
        <OverlaySpinner />
    </div>
    <BottomTabNavigationBar />
</div>
