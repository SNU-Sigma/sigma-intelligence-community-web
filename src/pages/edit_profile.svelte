<script lang="ts">
    import type { UpdateProfileDto } from '../lib/domain/profile/model/UpdateProfileDto'
    import { goto, params } from '@roxi/routify'
    import { ProfileAPIImpl } from '../lib/infrastructure/sigma-api/ProfileAPIImpl'
    import { createImageUpload } from '../lib/util/createImageUpload'

    const member: UpdateProfileDto = {
        profileImageUrl: $params.url,
        major: $params.major,
        freshmanYear: Number($params.Year),
    }
    const { files$, validFileTypes, handleUpload } = createImageUpload()
    const handleClick = async () => {
        member.profileImageUrl = await handleUpload()
    }
</script>

<div class="bg h-full w-full bg-gradient-to-br from-lime-200 to-indigo-400">
    <p class="md absolute left-5 top-5 mb-5 font-bold">SIGMA INTELLIGENCE</p>
    <h1 class="absolute top-10 left-5 mt-5 font-semibold">Edit Profile</h1>
    <div class="grid h-full grid-cols-6 grid-rows-5">
        <div
            class="col-span-4 col-start-2 row-span-1 row-start-2 text-center text-2xl font-semibold"
        >
            profile_url
            <div class="my-auto flex flex-col items-center">
                <input
                    class="mt-3 text-base font-normal"
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
        <div
            class="col-span-4 col-start-2 row-span-1 row-start-3 text-center text-2xl font-semibold"
        >
            freshmanYear <input
                class="mt-3 font-normal"
                type="text"
                bind:value={member.freshmanYear}
            />
        </div>
        <div
            class="col-span-4 col-start-2 row-span-1 row-start-4 text-center text-2xl font-semibold"
        >
            major <input
                class="mt-3 font-normal"
                type="text"
                bind:value={member.major}
            />
        </div>
        <button
            class="col-span-2 col-start-3 row-span-1 row-start-5 h-10 rounded-full bg-pink-900 text-center text-cyan-200"
            on:click={() => {
                ProfileAPIImpl.updateMyProfile(member)
                $goto('/profile')
            }}
        >
            완료
        </button>
    </div>
</div>
