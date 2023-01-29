<script lang="ts">
    import Confirm from '../lib/ui/common/Confirm.svelte'

    let showAlert = false
    function NOfunc() {
        showAlert = false
    }
    function OKfunc() {
        showAlert = false
        window.location.href = '/'
    }
</script>

<div class="flex flex-col gap-3 w-11/12 h-full mt-10">
    <div class="flex justify-between">
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
            on:click={() => (showAlert = true)}
        >
            취소하기
        </button>
        게시글 작성하기
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
            >사진첨부
        </button>
    </div>

    <div>글쓴이</div>
    <input type="text" placeholder="제목" class="text-sm w-full" />
    <textarea
        name="content"
        id="content"
        cols="30"
        rows="20"
        placeholder="게시글을 작성해주세요."
        class="text-sm w-full"
    />
</div>
<div class="absolute bottom-6 right-6">
    <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 text-xl focus:outline-none focus:ring-blue-300 rounded-lg px-2 text-center"
        >게시
    </button>
</div>

{#if showAlert}
    <Confirm
        title="이 게시물을 삭제하시겠어요?"
        content="지금 삭제하면 이 게시물이 사라집니다"
        OKmsg="게시물 삭제"
        NOmsg="계속 수정"
        {NOfunc}
        {OKfunc}
    />
{/if}
