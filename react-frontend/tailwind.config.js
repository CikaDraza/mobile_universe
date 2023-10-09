/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        // colors: {
        //     'blue': '#a52a2a',
        //     'pink': '#a52a2a',
        //     'orange': '#a52a2a',
        //     'green': '#a52a2a',
        //     'neon-green': '#a52a2a',
        //     'gray-dark': '#a52a2a',
        //     'gray': '#a52a2a',
        //     'gray-light': '#dedede',
        //     'black': '#a52a2a',
        //     'loader-transparent': 'rgba(0, 0, 0, .7)',
        //     'white': '#fff'
        // },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}

