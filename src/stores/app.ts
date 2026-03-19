// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        preloading: true,
        isLogin: false,
    }),
})
