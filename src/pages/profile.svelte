<script lang="ts">
    import { url } from '@roxi/routify'
    import { LightSwitch } from '@skeletonlabs/skeleton'
    import type { UserProfile } from '../lib/domain/common/model/UserProfile'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import BottomTabNavigationBar from '../lib/ui/common/BottomTabNavigationBar.svelte'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'
    import ProfileImage from '../lib/ui/common/ProfileImage.svelte'

    const member: Promise<UserProfile> = ProfileAPIImpl.getMyProfile()
</script>

<div
    class="flex flex-1 flex-col bg-gradient-to-br from-pink-300 to-indigo-400 dark:from-pink-600 dark:to-indigo-500"
>
    <div class="flex flex-row justify-between p-5">
        <p class="md font-bold">SIGMA INTELLIGENCE</p>
        <LightSwitch />
    </div>
    <div class="flex flex-1 flex-col items-center justify-center">
        {#await member}
            <OverlaySpinner />
        {:then item}
            <div class="mx-auto my-3 w-1/3">
                <ProfileImage src={item.profileImageUrl} />
            </div>
            <div class="mb-2 text-3xl font-bold">{item.name}</div>
            <div class="text-xl">{item.major} {item.freshmanYear}학번</div>
            <a
                class="btn variant-ghost-primary mt-4"
                href={$url('/edit-profile', item)}
            >
                수정
            </a>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
</div>

<BottomTabNavigationBar />
