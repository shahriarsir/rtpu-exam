<template>
    <div class="container px-3 py-20 mx-auto bangla">
        <div class="max-w-xl p-5 mx-auto space-y-3 border border-gray-500 rounded-2xl">
            <h2 class="text-2xl font-bold text-center">ফোন নাম্বার দিয়ে এক্সেস করুন</h2>
            <form @submit.prevent="verifyuser" class="flex flex-col items-center max-w-2xl gap-4 mx-auto md:flex-row">
                <input type="text" class="flex-1 p-3 border rounded-md outline-none" v-model="ttrx"
                    placeholder="ফোন নাম্বার...">


                <button type="submit" class="gap-3 btn" :class="{ loading }">
                    এগিয়ে যান
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import { useRouter } from "vue-router";
import { useUserStore } from "../../store/userStore";
const ttrx = ref('')

const loading = ref(false)
const router = useRouter();

const { login } = useUserStore()

const verifyuser = async () => {
    loading.value = true
    if (ttrx.value.length == 11) {
        let phone = '0' + ttrx.value.substr(-10)
        const data = await login(phone, router)

        if (data && data.loggedIn) {

            router.push('/')
        } else {
            router.push("/register?ttrx=" + phone);
        }

    }

    loading.value = false
}
</script>

<style lang="scss" scoped></style>