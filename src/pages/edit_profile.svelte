<script lang="ts">
    import type { UpdateProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import { goto, params } from '@roxi/routify'
    import ImageUploadForm from './examples/ImageUploadForm.svelte'

    const member: UpdateProfileDto = {
        profileImageUrl: $params.url,
        major: $params.major,
        freshmanYear: $params.Year,
    }
</script>

<p>profile_url: <ImageUploadForm /></p>
<p>
    freshmanYear: <input type="text" bind:value={member.freshmanYear} />
</p>
<p>
    major: <input type="text" bind:value={member.major} />
</p>
<button
    on:click={() => {
        $goto('/profile')
    }}
>
    완료
</button>
