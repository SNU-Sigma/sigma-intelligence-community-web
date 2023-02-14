<script lang="ts">
    import { goto, params } from '@roxi/routify'
    //import { toastStore } from '@skeletonlabs/skeleton'
    //import { createForm } from 'felte'
    //import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    //import { AuthAPIImpl } from '../lib/infrastructure/sigma-api/AuthAPIImpl'
    //import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import { axios } from 'axios'

    const member: ProfileDto = axios.fetch(ProfileAPIImpl.getMyProfile)
</script>

<div>
    {#await member}
        <p>loading</p>
    {:then item}
        <li>{item.name}</li>
        <li>{item.freshmanYear}</li>
        <li>{item.major}</li>
        <li>{item.profileImageUrl}</li>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
