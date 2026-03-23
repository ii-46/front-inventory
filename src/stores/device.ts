import {defineStore} from "pinia";
import {pb} from "@/pocketbase";
import type {RecordModel} from "pocketbase";

export const useDeviceStore = defineStore("devices", {
    state: () => ({
        devices: [] as RecordModel[],
    }),
    actions: {
        listenToDevices: async function () {
            this.devices = (await this.fetchDeviceList())
            console.log(this.devices[0])
            await pb.collection('device_type').subscribe('*', async (e) => {
                    console.log('device_type', e)
                    this.devices = (await this.fetchDeviceList())
                    console.log(this.devices[0])
                }
            );
        },
        fetchDeviceList: async function () {
            return await pb.collection('device_type').getFullList({});
        },
        unsubDevice: async function () {
            await pb.collection('device_type').unsubscribe('*');
            this.devices = [];
        },
        async createDevice(data: {
            name: string,
            snStartWith: string

        }) {
            const payload = {
                "name": data.name,
                "sn_start_with": data.snStartWith
            };

            return await pb.collection('device_type').create(payload)
        },
        fetchDevice: async function (id: string) {
            return await pb.collection('device_type').getOne(id, {});
        },
        async updateDevice(id: string, data: {
            name: string,
            snStartWith: string

        }) {
            const payload = {
                "name": data.name,
                "sn_start_with": data.snStartWith
            };

            return await pb.collection('device_type').update(id, payload)
        },
        async deleteDevice(id: string) {
            return await pb.collection('device_type').delete(id)
        },
    }
})
