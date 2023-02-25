<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createForm } from 'felte'
    import { AuthAPIImpl } from '../../infrastructure/sigma-api/AuthAPIImpl'
    import { LoginInfo$ } from '../../domain/login/LoginInfo$'
    import OverlaySpinner from '../common/OverlaySpinner.svelte'
    import { url } from '@roxi/routify'

    let isLoading = false

    type LoginInputData = {
        email: string
        password: string
    }

    const { form } = createForm<LoginInputData>({
        onSubmit: async (values) => {
            const { email, password } = values
            isLoading = true
            try {
                await AuthAPIImpl.login(email, password)
                LoginInfo$.setIsLoggedIn(true)
            } catch (e) {
                toastStore.trigger({
                    message: '로그인에 실패했습니다.',
                    preset: 'error',
                })
            } finally {
                isLoading = false
            }
        },
    })
</script>

{#if isLoading}
    <OverlaySpinner />
{/if}
<div class="my-auto flex flex-col items-center">
    <img src="/logo.svg" alt="" class="h-40 w-40" />
    <div class="h-4" />
    <h1>SIGMA</h1>
    <div class="h-8" />
    <form use:form class="flex w-64 flex-col gap-4">
        <label for="email" class="input-label">
            <span>이메일</span>
            <input type="text" name="email" autocomplete="username" />
        </label>
        <label for="password" class="input-label">
            <span>비밀번호</span>
            <input
                type="password"
                name="password"
                autocomplete="current-password"
            />
        </label>
        <button type="submit" class="btn variant-filled-primary">로그인</button>
    </form>
    <div class="h-8" />
    <a href={$url('signUp')}>회원가입 / 비밀번호 찾기</a>
</div>
