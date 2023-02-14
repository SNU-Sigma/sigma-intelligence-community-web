<script lang="ts">
    import { goto, params } from '@roxi/routify'
    import { createForm } from 'felte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { AuthAPIImpl } from '../lib/infrastructure/sigma-api/AuthAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import axios from 'axios'

    const member: Promise<ProfileDto> = ProfileAPIImpl.getMyProfile()
</script>

<div class="md absolute left-5 top-5">SIGMA INTELLIGENCE</div>

<div class="flex-col items-center">
    {#await member}
        <p>loading</p>
    {:then item}
        <p class="test-sm font-bold">{item.name}</p>
        <p class="test-md">{item.major} {item.freshmanYear}학번</p>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
