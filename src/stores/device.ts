import {defineStore} from "pinia";
import {pb} from "@/pocketbase";
import type {RecordModel} from "pocketbase";

export const useDeviceStore = defineStore("devices", {
    state: () => ({
        deviceTypes: [] as RecordModel[],
    }),
    actions: {
        listenToDeviceTypes: async function () {
            this.deviceTypes = (await this.fetchDeviceTypeList())
            console.log(this.deviceTypes[0])
            await pb.collection('device_type').subscribe('*', async (e) => {
                    console.log('device_type', e)
                    this.deviceTypes = (await this.fetchDeviceTypeList())
                    console.log(this.deviceTypes[0])
                }
            );
        },
        fetchDeviceTypeList: async function () {
            return await pb.collection('device_type').getFullList({});
        },
        unsubDeviceTypes: async function () {
            await pb.collection('device_type').unsubscribe('*');
            this.deviceTypes = [];
        },
        async createDeviceType(data: {
            name: string,
            snStartWith: string

        }) {
            const payload = {
                "name": data.name,
                "sn_start_with": data.snStartWith
            };

            return await pb.collection('device_type').create(payload)
        },
        fetchDeviceType: async function (id: string) {
            return await pb.collection('device_type').getOne(id, {});
        },
        async updateDeviceType(id: string, data: {
            name: string,
            snStartWith: string

        }) {
            const payload = {
                "name": data.name,
                "sn_start_with": data.snStartWith
            };

            return await pb.collection('device_type').update(id, payload)
        },
        async deleteDeviceType(id: string) {
            return await pb.collection('device_type').delete(id)
        },
    }
})
