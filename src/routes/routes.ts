import {createRouter, createWebHistory} from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import ManageUserView from "@/views/ManageUserView.vue";
import ManageGroupView from "@/views/ManageGroupView.vue";
import ManageDeviceView from "@/views/ManageDeviceView.vue";
import ManageTransactionTypeView from "@/views/ManageTransactionTypeView.vue";
import ManageInventoryView from "@/views/inventory/ManageInventoryView.vue";

const routes = [
    {path: '', component: HelloWorld},
    {
        path: '/administration',
        children: [
            {path: '', redirect: "administration/manage-user"},
            {path: 'manage-user', component: ManageUserView},
            {path: 'manage-group', component: ManageGroupView},
        ]
    },
    {
        path: '/inventory',
        children: [
            {path: '', redirect: "inventory/manage-device"},
            {path: 'manage-device', component: ManageDeviceView},
            {path: 'manage-transaction-type', component: ManageTransactionTypeView},
            {path: 'manage-inventory', component: ManageInventoryView},
        ]
    },
    {path: '/taxpayer', component: HelloWorld},
]

export const router = createRouter({
        history: createWebHistory(), routes,
    }
)
