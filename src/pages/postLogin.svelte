<script lang="ts">
    import type { loginForm } from '../store/postLogin'
    import { checkLogin } from '../store/postLogin'
    import { goto } from '@roxi/routify'
    let newLogin: loginForm = {
        loginId: '',
        loginPw: '',
    }
    const moveToLogin = (newLogin: loginForm) => {
        checkLogin.compareValue(newLogin)
        if ($checkLogin === true) {
            $goto('/postHome')
        } else {
            console.log('로그인 실패')
        }
        resetLogin()
    }
    const resetLogin = (): void => {
        ;(newLogin.loginId = ''), (newLogin.loginPw = '')
    }
</script>

<header>
    <div class="wrap">
        <h1>Login page</h1>
        <ul>
            <li>
                <span>아이디를 입력하세요: </span><input
                    type="text"
                    bind:value={newLogin.loginId}
                />
            </li>
            <li>
                <span>비밀번호를 입력하세요: </span><input
                    type="text"
                    bind:value={newLogin.loginPw}
                />
            </li>
            <button class="btn" on:click={() => moveToLogin(newLogin)}>
                로그인하기
            </button>
            <button class="btn"> 회원가입 </button>
        </ul>
    </div>
</header>

<style>
    header {
        width: 100%;
        height: 200px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #0d15a6;
    }
    header .wrap {
        color: aliceblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 800px;
    }
    .btn {
        padding: 1;
        padding-bottom: 10px;
        color: #000000;
        font-size: 0.8em;
        border: none;
        margin-left: 0;
        margin-right: 5px;
        text-decoration: none;
        cursor: pointer;
    }
</style>
