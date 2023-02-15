<script lang="ts">
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'

    const member: Promise<ProfileDto> = ProfileAPIImpl.getMyProfile()
</script>

<div class="bg h-full w-full bg-gradient-to-br from-pink-300 to-indigo-400">
    <p class="md absolute left-5 top-5 font-bold">SIGMA INTELLIGENCE</p>
    <div class="flex h-full flex-col items-center justify-center">
        {#await member}
            <OverlaySpinner />
        {:then item}
            <img
                class="mb-5 w-1/3 rounded-full"
                src={item.profileImageUrl}
                alt=""
            />
            <div class="mb-2 text-3xl font-bold">{item.name}</div>
            <div class="text-xl">{item.major} {item.freshmanYear}학번</div>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</div>
