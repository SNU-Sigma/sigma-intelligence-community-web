const config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        require('path').join(
            require.resolve('@skeletonlabs/skeleton'),
            '../**/*.{html,js,svelte,ts}',
        ),
    ],

    theme: {
        extend: {},
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
    ],

    darkMode: 'class',
}

module.exports = config
