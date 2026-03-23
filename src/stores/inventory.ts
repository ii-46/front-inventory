import {defineStore} from "pinia";
import type {RecordModel} from "pocketbase";
import {pb} from "@/pocketbase";

export const useInventoryStore = defineStore("inventory", {
    state: () => ({
        inventory: [] as RecordModel[]
    }),
    actions: {
        listenToInventory: async function () {
            this.inventory = (await this.fetchInventoryList())
            await pb.collection('inventory').subscribe('*', async (e) => {
                    this.inventory = (await this.fetchInventoryList())
                }
            );
        },
        fetchInventoryList: async function () {
            return await pb.collection('inventory').getFullList({
                expand: "user_id"
            });
        },
        unsubInventory: async function () {
            await pb.collection('inventory').unsubscribe('*');
            this.inventory = [];
        }, async createInventory(data: {
            user_id: string,
            name: string,
            is_default: boolean

        }) {
            const payload = {
                "user_id": data.user_id,
                "name": data.name,
                "is_default": data.is_default
            };
            return await pb.collection('inventory').create(payload)
        },
        fetchInventory: async function (id: string) {
            return await pb.collection('inventory').getOne(id, {
                expand: "user_id"
            });
        },
        async updateInventory(id: string, data: {
            user_id: string,
            name: string,
            is_default: boolean

        }) {
            const payload = {
                "user_id": data.user_id,
                "name": data.name,
                "is_default": data.is_default
            };

            return await pb.collection('inventory').update(id, payload)
        },
        async deleteInventory(id: string) {
            return await pb.collection('inventory').delete(id)
        },
    }
})