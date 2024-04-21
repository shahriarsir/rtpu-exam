<template>
    <div v-for="(exam, i) in exams" :key="i"
        class="relative max-w-2xl p-5 mx-2 my-4 border border-black shadow-md bangla bg-slate-50/10 rounded-2xl md:mx-auto">
        <div class="text-right">
            <button class="px-2 py-1 text-white bg-gray-700 border rounded" @click="copyText(exam._id)">
                কপি লিঙ্ক
            </button>
        </div>

        <h1 class="text-xl font-bold text-center text-red-500 animate-pulse">
            {{ exam.is_running ? "চলমান" : "পরবর্তী" }} পরীক্ষা...
        </h1>

        <div class="my-3 text-center">
            <h1 class="text-2xl font-bold ">{{ exam.title }}</h1>
            <h2 v-html="exam.subject"></h2>
        </div>
        <div class="grid gap-5 mb-4 md:grid-cols-2">
            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.schedule" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">পরীক্ষা শুরুঃ</p>
                    <p>{{ formatDateTime(exam.start_time) }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.schedule" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">পরীক্ষা শেষঃ</p>
                    <p>{{ formatDateTime(exam.end_time) }}</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-5">

            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.exam" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">পূর্ণমানঃ</p>
                    <p>{{ formatNumber(exam.total_marks) }} মিনিট</p>
                </div>
            </div>
            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.time" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">সময়ঃ</p>
                    <p>{{ formatNumber(exam.duration) }} মিনিট</p>
                </div>
            </div>

        </div>
        <div class="my-2 space-y-3 text-center">
            <p class="font-semibold text-center "> পরীক্ষা {{ exam.is_running ? 'শেষ' : 'শুরু' }} হতে সময় বাকি
            </p>
            <Timer :end="new Date(exam.is_running ? exam.end_time : exam.start_time)" />
        </div>



        <div class="grid grid-cols-3 gap-4 text-center " v-if="exam.is_running">
            <button class="px-4 py-2 font-semibold text-white bg-green-600 border rounded-md" v-if="!exam.is_upcoming"
                @click="startExam(exam._id, exam.chapter)">
                পরীক্ষা
            </button>
            <button class="px-4 py-2 font-semibold text-white bg-green-600 border rounded-md" v-else
                @click="upcomingAlert('MCQ Exam', 'starts')">
                পরীক্ষা
            </button>
            <router-link class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md"
                v-if="exam.solution_published" :to="`/solution/${exam._id}`">
                উত্তরপত্র
            </router-link>
            <button class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md" v-else
                @click="upcomingAlert('MCQ Solve', 'Ends')">
                উত্তরপত্র
            </button>

            <button class="px-4 py-2 font-semibold text-white border rounded-md bg-violet-500"
                @click="upcomingAlert('Leaderboard', 'Ends')">
                ফলাফল
            </button>

        </div>

    </div>
</template>

<script setup>
import { useAlertStore } from '../store/alertStore';
import { useExamStore } from '../store/examStore';
import Timer from './Timer.vue';
import icons from '../plugins/subjectIcons'
import { formatNumber, formatDateTime } from '../plugins/formatData'
defineProps({
    exams: {
        type: Array,
        required: true
    }
})

const { upcomingAlert } = useAlertStore();

const { startExam } = useExamStore();

const copyText = (e) => {
    const el = document.createElement('textarea');
    el.value = window.location.href + `link/${e}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link Copied');
}



</script>

<style lang="scss" scoped></style>