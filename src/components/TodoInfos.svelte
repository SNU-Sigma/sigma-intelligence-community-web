<script>
    export let todoCount
    export let handleChangeViewMode
    export let viewMode

    import Constant from "../constant";
</script>

<div class="info">
    <div class="wrap">
        <span>COUNT: {todoCount}</span>
        <div>
            <button class="btn" class:selected={viewMode === Constant.ALL} on:click={() => handleChangeViewMode(Constant.ALL)}>ALL</button>
            <button class="btn" class:selected={viewMode === Constant.DONE} on:click={() => handleChangeViewMode(Constant.DONE)}>정식게시글</button>
            <button class="btn" class:selected={viewMode === Constant.ACTIVE} on:click={() => handleChangeViewMode(Constant.ACTIVE)}>임시저장 게시글</button>
        </div>
    </div>
</div>

<style>
    .selected {
        border-bottom: 2px solid #005EFF;
    }
</style>