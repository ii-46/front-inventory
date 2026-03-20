import {defineStore} from "pinia";
import {pb} from "@/pocketbase";
import type {RecordModel} from "pocketbase";


export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [] as RecordModel[],
        filter: "",
        companies: [] as RecordModel[],
        groups: [] as RecordModel[],
    }),
    actions: {
        listenToUsers: async function () {
            this.users = (await this.fetchUsersList())
            console.log(this.users[0])
            await pb.collection('users').subscribe('*', async (e) => {
                    console.log('users', e)
                    this.users = (await this.fetchUsersList())
                    console.log(this.users[0])
                }
            );
        },
        fetchUsersList: async function () {
            return await pb.collection('users').getFullList({
                expand: "group_id,company_id"
            });
        },
        unsubUsers: async function () {
            await pb.collection('users').unsubscribe('*');
            this.users = [];
        },
        async createUser(data: {
            email: string,
            name: string,
            group_id: string,
            phone: string,
            company_id: string

        }) {
            const payload = {
                "email": data.email,
                "emailVisibility": true,
                "name": data.name,
                "group_id": data.group_id,
                "phone": data.phone,
                "company_id": data.company_id,
                "password": "12345678",
                "passwordConfirm": "12345678"
            };

            return await pb.collection('users').create(payload)
        },
        fetchCompanyList: async function () {
            return await pb.collection('company').getFullList({});
        },
        fetchGroupList: async function () {
            return await pb.collection('group').getFullList({});
        },
    }
});