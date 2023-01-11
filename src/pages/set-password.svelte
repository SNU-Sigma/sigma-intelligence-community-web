<script lang="ts">
    import { goto, params } from '@roxi/routify'
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createForm } from 'felte'
    import { LoginInfo$ } from '../lib/domain/login/LoginInfo$'
    import { AuthAPIImpl } from '../lib/infrastructure/sigma-api/AuthAPIImpl'
    import OverlaySpinner from '../lib/ui/common/OverlaySpinner.svelte'

    type InputData = {
        password: string
        passwordCheck: string
    }

    let isLoading = false

    const { form } = createForm<InputData>({
        onSubmit: async ({ password, passwordCheck }) => {
            if (password !== passwordCheck) {
                toastStore.trigger({
                    message: '비밀번호가 일치하지 않습니다.',
                    preset: 'error',
                })
                return
            }

            if (/\s/.test(password)) {
                toastStore.trigger({
                    message: '비밀번호에 공백이 포함되어있습니다.',
                    preset: 'error',
                })
                return
            }

            if (password.length === 0) {
                toastStore.trigger({
                    message: '비밀번호를 입력해주세요.',
                    preset: 'error',
                })
                return
            }

            const { token } = $params
            isLoading = true
            try {
                await AuthAPIImpl.setPassword(token, password)
                LoginInfo$.setIsLoggedIn(true)
                toastStore.trigger({
                    message: '성공적으로 설정되었습니다.',
                    preset: 'success',
                })
                $goto('/')
            } catch (e) {
                toastStore.trigger({
                    message:
                        '다시 시도해주세요. 링크가 만료되지 않았는지 확인해주세요.',
                    preset: 'error',
                })
            } finally {
                isLoading = false
            }
        },
    })
</script>

<!-- routify:options name="setPassword" -->
{#if isLoading}
    <OverlaySpinner />
{/if}
<div class="flex flex-col items-center">
    <h2>비밀번호 설정</h2>
    <div class="h-9" />
    <form use:form class="w-64 flex flex-col gap-4">
        <label for="username">
            <input
                class="hidden"
                type="email"
                name="username"
                readonly
                value={$params.email}
            />
        </label>
        <label for="password">
            <input
                type="password"
                name="password"
                autocomplete="new-password"
                placeholder="새로운 비밀번호"
            />
        </label>
        <label for="password-check">
            <input
                type="password"
                name="passwordCheck"
                autocomplete="new-password"
                placeholder="새로운 비밀번호 확인"
            />
        </label>
        <button type="submit" class="btn btn-filled-primary">설정하기</button>
    </form>
</div>
