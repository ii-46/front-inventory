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

    },
    aliases: {
       MyAddBtn: VBtn
    },
    defaults: {
        VBtn: {variant: 'evaluated',},
        VTextField: {variant: 'outlined', density: 'compact'},
        VAutocomplete: { variant: 'outlined', density: 'compact'},
        MyAddBtn: {
            variant: 'evaluated',
            color: 'secondary'
        }
    }
})
