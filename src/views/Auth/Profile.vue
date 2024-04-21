<template>
    <div class="container p-4 mx-auto mt-2 space-y-2 bg-gray-100 dark:text-gray-900 rounded-2xl">
        <p v-for="(k, m) in user" :key="m">
            <span class="mr-2 font-semibold">{{ title(m) }}:</span>{{ k }}
        </p>
        <div class="pt-3">
            উক্ত ইনফরমেশনে যদি কোনো ভুল থেকে থাকে, তাহলে সেটি পরিবর্তন করতে চাইলে এই বাটনে ক্লিক করে আমাদের সাথে যোগাযোগ
            করবে:
            <a href="https://www.facebook.com/asg.varsityguccho/" target="_blank" class="btn btn-info">Click Here</a>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
let storeData = localStorage.getItem("bn23exam")
const user = storeData && storeData != 'undefined' ? JSON.parse(storeData) : false

if (!user && !user.ttrx && !user.name && !user.board) {
    router.push({ name: 'Login' })
}

const title = (s) => {
    switch (s) {
        case 'ttrx':
            return 'TTRX'
        case 'name':
            return 'Name'
        case 'phone':
            return 'Phone'
        case 'reg':
            return 'Registration Number'
        case 'college':
            return 'College'
        case 'board':
            return 'Board'
        case 'roll':
            return 'Roll Number'
        case 'group':
            return 'Group'
        default:
            return 'Unknown'
    }

}

</script>

<style lang="scss" scoped></style>