import Vmenu from 'floating-vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    Vmenu.options.themes['filter-menu'] = {
        ...Vmenu.options.themes.menu,
        '$resetCss': true,
        placement: 'left',
    }
    Vmenu.options.themes['item-menu'] = {
        ...Vmenu.options.themes.menu,
        '$resetCss': true,
        placement: 'left',
    }
    nuxtApp.vueApp.use(Vmenu) // <-- I am not sure if we need this
    return
});
