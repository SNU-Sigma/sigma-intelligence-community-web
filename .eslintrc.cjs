module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.svelte'],
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-svelte'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:svelte/recommended',
        'plugin:svelte/prettier',
        'prettier',
    ],
    root: true,
    env: {
        browser: true,
    },
    ignorePatterns: ['/*', '!/src'],
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
}
