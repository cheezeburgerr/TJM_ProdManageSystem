import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',


        flowbite.content(),
    ],


    theme: {
        extend: {

            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'Inter': ['Inter', 'sans'],
                'DM': ['DM Sans', 'sans'],
                'Bebas': ['Bebas', 'sans'],
            },
            colors: {
                'teal': {
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#042f2e'
                  },
              }

        },
    },

    plugins: [forms,
        flowbite.plugin(),
    ],
    darkMode: 'class',
};
