# 시그마 인텔리전스 서비스 - 웹 클라이언트

`Svelte` `Vite` `TypeScript`

## 실행 방법

1. [yarn](https://classic.yarnpkg.com/en/docs/install) 설치 `npm install --global yarn`
2. 폴더 내에서 `yarn install` 실행하여 node_modules 설치
3. `yarn run dev` 실행

## 권장 VSCode 플러그인

여기 목록의 내용들은 .vscode/extensions.json에 명시해놓았기 때문에 VSCode로 처음 폴더 열 때 설치할 건지 물어봅니다.

-   **Svelte** `svelte.svelte-vscode` Svelte 관련 자동완성
-   **ESLint** `dbaeumer.vscode-eslint` ESLint 에러 표시
-   **Prettier** `esbenp.prettier-vscode` 코드 포매팅 시 사용 가능
-   **Code Spell Checker** `streetsidesoftware.code-spell-checker` 영어 단어 spelling 검사, 의도치 않은 오타 방지에 좋음
-   **Tailwind CSS Intellisense** `bradlc.vscode-tailwindcss` TailwindCSS 자동완성

## `<style>` 태그 대신 Tailwind class utility 사용

Svelte에 style 태그가 있긴 하지만, 직접 값을 지정하는 것은 꽤 피곤한 일이고, 디자인의 통일성을 맞추기 어려워지는 부분들이 있어서 TailwindCSS라는 것을 사용합니다. (정확히는 그 위에
SkeletonUI까지 사용하여 테마 생성)

[Tailwind에 대해 잘 설명한 영상](https://youtu.be/--D4WMPEIZI)

Tailwind는 문서화가 잘 되어있어서 공식 웹사이트를 참고해서 class명에 원하는 값들을 추가해주면 됩니다. (위에서 나온 Tailwind 플러그인 깔면 자동완성까지!)

예시 - margin | https://tailwindcss.com/docs/margin

### [SkeletonUI](https://www.skeleton.dev/)

여러 유용한 컴포넌트 제공 및, 테마 설정 시 자동으로 예쁘게 기본 html 태그들에 디자인을 적용시켜줍니다. Tailwind 기반이라 Tailwind의 utility class들을 그대로 사용할 수 있습니다.
Tailwind의 확장팩이라고 생각하면 좋습니다. Tailwind에서 제공하는 기본 색들 대신 `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `surface` 컬러들을 사용할 수 있습니다.
