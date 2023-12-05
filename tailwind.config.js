module.exports = {
    purge: [
        './src/**/*.vue',
    ],
    darkMode: false,
    theme: {
        extend: {},
        screens:{
            'xs': {'max': '389.99px'},
            // => @media (min-max: 100px) { ... }

            'sm': '390px',
            // => @media (min-width: 390px) { ... }

            'md': '640px',
            // => @media (min-width: 640px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1440px',
            // => @media (min-width: 1440px) { ... }

            '2xl': '1440px',
            // => @media (min-width: 1440px) { ... }
        },
    },
    variants: {
        extend: {
            // fontSize: ['important'],
            // height: ['important']
        },
    },
    plugins: [],
}
