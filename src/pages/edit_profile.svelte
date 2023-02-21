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

<div>
    profile_url:
    <div class="my-auto flex flex-col items-center">
        <input
            accept={validFileTypes.join(',')}
            type="file"
            bind:files={$files$}
        />
        <button class="btn variant-ghost-primary mt-4" on:click={handleClick}>
            Upload
        </button>
    </div>
</div>
<p>
    freshmanYear: <input type="text" bind:value={member.freshmanYear} />
</p>
<p>
    major: <input type="text" bind:value={member.major} />
</p>
<button
    on:click={() => {
        $goto('/profile')
        ProfileAPIImpl.updateMyProfile(member)
    }}
>
    완료
</button>
