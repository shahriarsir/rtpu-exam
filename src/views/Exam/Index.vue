<template>
    <div class="container py-5 mx-auto space-y-10" v-if="exams.length > 0">

        <div v-if="currentExams.length > 0">

            <ExamSchedule :exams="currentExams" />

        </div>
        <div v-if="upcomingExams.length > 0">

            <ExamSchedule :exams="upcomingExams" />

        </div>
        <div class="grid gap-4 px-2 mx-auto bangla md:grid-cols-2 bensen">
            <div v-for="exam, i in reversedExams" :key="exam.id"
                class="relative p-4 space-y-2 border-2 border-gray-700 rounded-xl">

                <h1 class="text-lg font-bold text-center">
                    {{ exam.title }}
                </h1>
                <!-- <p class="font-semibold text-center">
                    {{ exam.description }}
                </p> -->
                <p class="text-center">
                    <span class="font-semibold">বিষয়ঃ </span>
                    {{ exam.subject }}
                </p>


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
                            <p class="text-gray-500 ">Total Marks:</p>
                            <p>{{ formatNumber(exam.total_marks) }} মিনিট</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 overflow-hidden border rounded-lg">
                        <div class="p-2 bg-gray-100 ">
                            <img :src="icons.time" class="h-8" alt="Exam Duration">
                        </div>
                        <div class="text-sm font-semibold">
                            <p class="text-gray-500 ">Duration:</p>
                            <p>{{ formatNumber(exam.duration) }} Minutes</p>
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-3 gap-4 text-center ">


                    <button class="px-4 py-2 font-semibold text-white bg-green-600 border rounded-md"
                        v-if="!exam.is_upcoming" @click="startExam(exam._id, exam.chapter)">
                        Start Exam
                    </button>
                    <button class="px-4 py-2 font-semibold text-white bg-green-600 border rounded-md" v-else
                        @click="upcomingAlert('MCQ Exam', 'starts')">
                        Start Exam
                    </button>
                    <router-link class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md"
                        v-if="exam.solution_published" :to="`/solution/${exam._id}`">উত্তরপত্র
                    </router-link>
                    <button class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md" v-else
                        @click="upcomingAlert('MCQ Solve', 'Ends at ' + formatDateTime(exam.solution_publish_time))">
                        Solution
                    </button>
                    <router-link v-if="exam.result_published"
                        class="px-4 py-2 font-semibold text-white border rounded-md bg-violet-500"
                        :to="`/ranking/${exam._id}`">ফলাফল
                    </router-link>
                    <button class="px-4 py-2 font-semibold text-white bg-red-500 border rounded-md" v-else
                        @click="upcomingAlert('MCQ Leaderboard', 'Ends')">
                        Ranking
                    </button>
                </div>




            </div>


        </div>

    </div>
    <div v-else class="flex flex-col items-center justify-center w-full h-screen">
        <!-- <img src="../../assets/examloading.gif" alt="" class="h-56"> -->
        <div class="flex items-center justify-center space-x-1 text-sm text-gray-700 ">
            <svg fill="none" class="w-10 h-10 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor" fill-rule="evenodd" />
            </svg>

            <div class="text-lg ">Please wait ...</div>
        </div>
    </div>
    <Alert />
</template>

<script setup>

import Alert from '../../components/Alert.vue';
import ExamSchedule from '../../components/ExamSchedule.vue';
import icons from '../../plugins/subjectIcons'
import { useExamStore } from '../../store/examStore';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '../../store/alertStore';
import { formatNumber, formatDateTime } from '../../plugins/formatData'
import { computed, onMounted } from 'vue';
const examStore = useExamStore();
const { startExam } = examStore





const { exams, upcomingExams, currentExams, } = storeToRefs(examStore);
const { upcomingAlert } = useAlertStore()
const reversedExams = computed(() => exams.value.reverse().filter(exam => exam.is_ended))

onMounted(() => {
    examStore.getExams()
})



</script>

<style lang="scss" scoped></style>base