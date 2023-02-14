<script lang="ts">
    import { createForm } from 'felte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { AuthAPIImpl } from '../lib/infrastructure/sigma-api/AuthAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import axios from 'axios'

    const member: Promise<ProfileDto> = ProfileAPIImpl.getMyProfile()
</script>

<div class="bg-lime-300">
    <p class="md absolute left-5 top-5 font-bold">SIGMA INTELLIGENCE</p>

    <div class="flex flex-col items-center">
        {#await member}
            <p>loading</p>
        {:then item}
            <img
                class="h-30 w-30 p-5... object-cover"
                src={item.profileImageUrl}
            />
            <p class="... text-sm font-bold">{item.name}</p>
            <p class="... text-lg">{item.major} {item.freshmanYear}학번</p>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</div>
