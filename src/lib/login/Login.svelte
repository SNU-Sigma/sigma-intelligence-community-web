<script lang="ts">
    import { toastStore } from '@skeletonlabs/skeleton'
    import { createForm } from 'felte'
    import { LoginAPIImpl } from '../infrastructure/sigma-api/LoginAPIImpl'
    import { LoginInfo$ } from './store/LoginInfo$'

    type LoginInputData = {
        email: string
        password: string
    }

    const { form } = createForm<LoginInputData>({
        onSubmit: async (values) => {
            const { email, password } = values
            try {
                await LoginAPIImpl.login(email, password)
                LoginInfo$.setIsLoggedIn(true)
            } catch (e) {
                toastStore.trigger({
                    message: '로그인에 실패했습니다.',
                    preset: 'error',
                })
            }
        },
    })
</script>

<form use:form class="w-64 flex flex-col gap-4">
    <label>
        <span>이메일</span>
        <input type="text" name="email" />
    </label>
    <label>
        <span>비밀번호</span>
        <input type="password" name="password" />
    </label>
    <button type="submit" class="btn btn-filled-primary">로그인</button>
</form>
