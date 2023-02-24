<script lang="ts">
    import type { UpdateProfileDto } from '../lib/domain/profile/model/UpdateProfileDto'
    import { params } from '@roxi/routify'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import { createImageUpload } from '../lib/util/createImageUpload'
    import { FileButton, toastStore } from '@skeletonlabs/skeleton'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import ProfileImage from '../lib/ui/common/ProfileImage.svelte'

    let isLoading = false
    const member: UpdateProfileDto = {
        profileImageUrl: $params.profileImageUrl,
        major: $params.major,
        freshmanYear: Number($params.freshmanYear),
    }
    const { files$, validFileTypes, handleUpload } = createImageUpload()

    $: {
        if ($files$) {
            const uploadImage = async () => {
                member.profileImageUrl = await handleUpload()
            }
            uploadImage()
        }
    }
</script>

{#if isLoading}
    <OverlaySpinner />
{/if}
<div
    class="bg flex h-full w-full flex-col bg-gradient-to-br from-lime-200 to-indigo-400"
>
    <p class="md p-5 font-bold">SIGMA INTELLIGENCE</p>
    <h1 class="p-5 font-semibold">Edit Profile</h1>
    <div class="mt-10 grid flex-1 grid-cols-6 gap-3">
        <div class="col-span-4 col-start-2 text-center text-2xl font-semibold">
            프로필 사진
            <div class="mx-auto my-3 w-40">
                <ProfileImage src={member.profileImageUrl} />
            </div>
            <FileButton
                bind:files={$files$}
                button="variant-filled-secondary"
                accept={validFileTypes}
            >
                사진 변경
            </FileButton>
        </div>
        <label class="col-span-4 col-start-2 text-center">
            <span class="mt-5 text-2xl font-semibold">학번</span>
            <input
                class="mt-3 font-normal"
                type="text"
                bind:value={member.freshmanYear}
            />
        </label>
        <label class="col-span-4 col-start-2 text-center">
            <span class="text-2xl font-semibold">전공</span>
            <input
                class="mt-3 font-normal"
                type="text"
                bind:value={member.major}
            />
        </label>
        <button
            class="col-span-2 col-start-3 h-10 rounded-full bg-pink-900 text-center text-cyan-200"
            on:click={async () => {
                isLoading = true
                try {
                    await ProfileAPIImpl.updateMyProfile(member)
                    toastStore.trigger({
                        message: '성공적으로 수정되었습니다.',
                        preset: 'success',
                    })
                    history.back()
                } catch (e) {
                    toastStore.trigger({
                        message: '오류가 발생했습니다. 다시 시도해주세요.',
                        preset: 'error',
                    })
                } finally {
                    isLoading = false
                }
            }}
        >
            완료
        </button>
    </div>
</div>
