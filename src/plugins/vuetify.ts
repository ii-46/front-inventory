/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import {createVuetify} from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

export default createVuetify({
    theme: {
        defaultTheme: 'light',
        utilities: true,
        themes: {
            light: {
                colors: {
                    background: '#ecedf6',
                    surface: '#f9f9ff',
                    'surface-dim': '#d8d9e2',
                    'surface-bright': '#f9f9ff',
                    'on-surface': '#191c22',
                    outline: '#727785',
                    'outline-variant': '#c2c6d6',
                    primary: '#3f85f3',
                    'on-primary': '#ffffff',
                    secondary: '#00668a',
                    'on-secondary': '#ffffff',
                    tertiary: '#6348c3',
                    'on-tertiary': '#ffffff',
                    error: '#ba1a1a',
                    'on-error': '#ffffff',
                    'surface-light': '#e7e8f1',
                },
                dark: false,
                variables: {
                    'overlay-background': '#161c27',
                },
            },
            dark: {
                colors: {
                    background: '#1d2026',
                    surface: '#11131a',
                    'surface-dim': '#11131a',
                    'surface-bright': '#373940',
                    'on-surface': '#e1e2eb',
                    outline: '#8c909f',
                    'outline-variant': '#424753',
                    primary: '#3f85f3',
                    'on-primary': '#d7e2ff',
                    secondary: '#7bd0ff',
                    'on-secondary': '#00354a',
                    tertiary: '#cbbeff',
                    'on-tertiary': '#330793',
                    error: '#ffb4ab',
                    'on-error': '#690005',
                    'surface-light': '#373940',
                },
                dark: true,
                variables: {
                    'overlay-background': '#161c27',
                },
            },
        },
    },
})
