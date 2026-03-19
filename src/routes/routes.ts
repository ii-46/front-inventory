import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import ManageUserView from "@/views/ManageUserView.vue";

const routes = [
    {path: '', component: HelloWorld},
    {
        path: '/administration',
        children: [
            {path: '', redirect: "administration/manage-user"},
            {path: 'manage-user', component: ManageUserView},
        ]
    },
    {path: '/taxpayer', component: HelloWorld},
]

export const router = createRouter({
        history: createWebHistory(), routes,
    }
)
