<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createForm } from 'felte'
    import { AuthAPIImpl } from '../lib/infrastructure/sigma-api/AuthAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'

    let isLoading = false

    type SignUpData = {
        email: string
    }

    const { form } = createForm<SignUpData>({
        onSubmit: async (values) => {
            const { email } = values
            isLoading = true
            try {
                await AuthAPIImpl.signUpOrUpdatePassword(email)
                toastStore.trigger({
                    message: '메일이 전송되었습니다.',
                    preset: 'success',
                })
                history.back()
            } catch (e) {
                toastStore.trigger({
                    message:
                        '다시 시도해주세요. 이메일이 등록되었는지 관리자에게 확인해주세요.',
                    preset: 'error',
                })
            } finally {
                isLoading = false
            }
        },
    })
</script>

<!-- routify:options name="signUp" -->
{#if isLoading}
    <OverlaySpinner />
{/if}
<div class="my-auto flex flex-col items-center">
    <h2>회원가입 / 비밀번호 찾기</h2>
    <div class="h-8" />
    <form use:form class="flex w-64 flex-col gap-4">
        <label for="email" class="input-label">
            <span>이메일</span>
            <input type="text" name="email" autocomplete="username" />
        </label>
        <button type="submit" class="btn variant-filled-primary">
            가입/찾기
        </button>
    </form>
</div>
