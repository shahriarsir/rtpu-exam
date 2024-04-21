<template>
    <div v-for="(exam, i) in exams" :key="i"
        class="relative max-w-2xl p-5 mx-2 my-4 border border-black shadow-md bangla bg-slate-50/10 rounded-2xl md:mx-auto">
        
            <button class="absolute z-10 px-2 py-1 text-sm border rounded right-4 hover:bg-blue-500 hover:text-white" @click="copyText(exam._id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>

            </button>
        

        <h1 class="text-xl font-bold text-center text-red-500 md:text-2xl animate-pulse">
            {{ exam.is_running ? "Ongoing" : "Upcoming" }} exam...
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
                    <p class="text-gray-500 ">Exam Start:</p>
                    <p>{{ formatDateTime(exam.start_time) }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.schedule" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">Exam Ends:</p>
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
                    <p class="text-gray-500 ">Total Marks</p>
                    <p>{{ (exam.total_marks) }} </p>
                </div>
            </div>
            <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                <div class="p-2 bg-gray-100 ">
                    <img :src="icons.time" class="h-8" alt="Exam Duration">
                </div>
                <div class="text-sm font-semibold">
                    <p class="text-gray-500 ">Duration:</p>
                    <p>{{ (exam.duration) }} Minutes</p>
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
                Start Exam
            </button>
            <button class="px-4 py-2 font-semibold text-white bg-green-600 border rounded-md" v-else
                @click="upcomingAlert('MCQ Exam', 'starts')">
                Start Exam
            </button>
            <router-link class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md"
                v-if="exam.solution_published" :to="`/solution/${exam._id}`">
                Solution
            </router-link>
            <button class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md" v-else
                @click="upcomingAlert('MCQ Solve', 'Ends')">
                Solution
            </button>

            <button class="px-4 py-2 font-semibold text-white border rounded-md bg-violet-500"
                @click="upcomingAlert('Leaderboard', 'Ends')">
                Ranking
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