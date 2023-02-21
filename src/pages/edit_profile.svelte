<script lang="ts">
    import type { UpdateProfileDto } from '../lib/domain/profile/model/UpdateProfileDto'
    import { goto, params } from '@roxi/routify'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import { createImageUpload } from '../lib/util/createImageUpload'

    const member: UpdateProfileDto = {
        profileImageUrl: $params.url,
        major: $params.major,
        freshmanYear: $params.Year,
    }
    const { files$, validFileTypes, handleUpload } = createImageUpload()
    const handleClick = async () => {
        member.profileImageUrl = await handleUpload()
    }
</script>

<p class="md absolute left-5 top-5 font-bold">SIGMA INTELLIGENCE</p>
<div class="flex h-full flex-col items-center justify-center gap-y-5">
    <div>
        profile_url:
        <div class="my-auto flex flex-col items-center">
            <input
                accept={validFileTypes.join(',')}
                type="file"
                bind:files={$files$}
            />
            <button
                class="btn variant-ghost-primary mt-4"
                on:click={handleClick}
            >
                Upload
            </button>
        </div>
    </div>
    <div>
        freshmanYear <input type="text" bind:value={member.freshmanYear} />
    </div>
    <div class="gap-y-40">
        major <input type="text" bind:value={member.major} />
    </div>
    <button
        on:click={() => {
            ProfileAPIImpl.updateMyProfile(member)
            $goto('/profile')
        }}
    >
        완료
    </button>
</div>
