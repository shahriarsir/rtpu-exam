<template>
    <div class="container max-w-2xl px-2 py-20 mx-auto">

        <div class="max-w-xl p-5 mx-auto space-y-3 border border-gray-500 rounded-2xl">

            <h2 class="text-2xl font-bold text-center bangla">
                তোমার অন্যান্য তথ্য দাও
            </h2>
            <form @submit.prevent="register" class="space-y-3 bangla">
                <div class="form-control">
                    <label for="name">তোমার নাম</label>
                    <input type="text" required v-model="user.name" placeholder="নাম"
                        class="p-3 mt-2 border rounded-md outline-none">
                </div>


                <div class="form-control">
                    <label for="college">তোমার শিক্ষা প্রতিষ্ঠান(কলেজ)</label>
                    <input type="text" required v-model="user.institute" placeholder="শিক্ষা প্রতিষ্ঠান"
                        class="p-3 mt-2 border rounded-md outline-none">
                </div>

                <div class="form-control">
                    <label for="batch">তোমার ব্যাচ</label>
                    <select class="p-3 mt-2 border rounded-md outline-none" required v-model="user.batch">
                        <option value="" selected>Select HSC Batch</option>
                        <option value="HSC 2023">HSC 2023</option>
                        <option value="HSC 2024">HSC 2024</option>
                        <option value="HSC 2025">HSC 2025</option>
                        <option value="HSC 2026">HSC 2026</option>
                        <option value="Others">Others</option>
                    </select>
                </div>




                <div class="text-center">
                    <button type="submit" class="gap-3 btn" :class="{ loading }">
                        সাবমিট
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

            </form>
        </div>

    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '../../store/userStore';

const router = useRouter();
const route = useRoute();



const user = ref({
    phone: '',
    name: '',
    institute: '',
    batch: '',
})

if (route.query.ttrx) {
    user.value.phone = route.query.ttrx

} else {
    router.replace('/login')
}
const { registerUser } = useUserStore()
const loading = ref(false)
const register = async () => {
    loading.value = true
    await registerUser(user.value, router)
    loading.value = false
}


</script>

<style lang="scss" scoped></style>