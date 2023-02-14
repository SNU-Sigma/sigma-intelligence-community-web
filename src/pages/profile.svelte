<script lang="ts">
    import type { ProfileDto } from '../lib/domain/profile/model/ProfileDto'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'

    const member: Promise<ProfileDto> = ProfileAPIImpl.getMyProfile()
</script>

<div class="bg h-full w-full bg-gradient-to-br from-pink-300 to-indigo-400">
    <p class="md absolute left-5 top-5 font-bold">SIGMA INTELLIGENCE</p>
    <div class="flex flex-col items-center">
        {#await member}
            <p>loading</p>
        {:then item}
            <img class="mb-5 w-1/3 rounded-full" src={item.profileImageUrl} />
            <div class="mb-2 text-3xl font-bold">{item.name}</div>
            <div class="text-xl">{item.major} {item.freshmanYear}학번</div>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</div>
