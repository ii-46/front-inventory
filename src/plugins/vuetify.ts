/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import {createVuetify} from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'
import {VBtn} from "vuetify/components";

export default createVuetify({
    theme: {
        defaultTheme: 'light',
        utilities: true,

    }, display: {
        mobileBreakpoint: 'md',
        thresholds: {
            xs: 0,
            sm: 600,
            md: 840,
            lg: 1145,
            xl: 1545,
            xxl: 2138,
        },
    },
    aliases: {
        MyAddBtn: VBtn,
        MyEditBtn: VBtn,
        MyDeleteBtn: VBtn
    },
    defaults: {
        VBtn: {variant: 'evaluated',},
        VTextField: {variant: 'outlined', density: 'compact'},
        VAutocomplete: {variant: 'outlined', density: 'compact'},
        MyAddBtn: {
            variant: 'evaluated',
            color: 'secondary'
        },
        MyEditBtn: {
            variant: 'outlined',
            color: 'secondary',
            size: 'small',
            rounded: true,
        },
        MyDeleteBtn: {
            variant: 'outlined',
            color: 'error',
            size: 'small',
            rounded: true,
        },
        VDateInput: {
            variant: 'outlined', density: 'compact'
        }
    }
})
