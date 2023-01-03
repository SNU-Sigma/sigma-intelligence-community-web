<script lang="ts">
    import { createForm } from 'felte'
    import { LoginInfo$ } from './store/LoginInfo$'

    type LoginInputData = {
        email: string
        password: string
    }

    const { form } = createForm<LoginInputData>({
        onSubmit: (values) => {
            const { email, password } = values
            console.log({ email, password })
            LoginInfo$.update((loginInfo) => ({
                ...loginInfo,
                isLoggedIn: true,
            }))
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
