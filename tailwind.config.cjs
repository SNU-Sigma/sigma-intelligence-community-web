const config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        require('path').join(
            require.resolve('@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}',
        ),
    ],

    theme: {
        extend: {
            fontFamily: {
                scdream: ['SCDream'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
    ],

    darkMode: 'class',
}

module.exports = config
