<template>
    <div class="max-w-2xl mx-auto">
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold">Exams</h1>
            <ExamModal @close="fetchExams"></ExamModal>
        </div>

        <div class="mt-5 space-y-5">
            <div v-for="exam in exams" :key="exam._id" class="grid grid-cols-2 p-5 border rounded-md">
                <div class="space-y-3">
                    <p class="text-lg font-semibold">
                        {{ exam.title }}
                    </p>
                    <p>
                        {{ exam.subject }}
                    </p>
                    <p>
                        Duration: {{ exam.duration }} Minutes
                    </p>
                    <p>
                        Total Marks: {{ exam.total_marks }}
                    </p>
                </div>
                <div class="space-y-3">
                    <p>
                        Exam Start: {{ formatDateTime(exam.start_time) }}
                    </p>
                    <p>
                        Exam Ends: {{ formatDateTime(exam.end_time) }}
                    </p>
                    <p>
                        Result Publish: {{ formatDateTime(exam.result_publish_time) }}
                    </p>
                    <p>
                        Solution Publish: {{ formatDateTime(exam.solution_publish_time) }}
                    </p>
                    <div class="flex gap-2">
                        <router-link :to="`/admin/ranking/${exam._id}`"
                            class="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md">
                            Ranking
                        </router-link>
                        <div class="">
                            <ExamModal :examData="exam" @close="fetchExams"></ExamModal>
                        </div>
                        <button @click="deleteExam(exam._id)"
                            class="px-4 py-2 font-semibold text-white bg-red-500 rounded-md">
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import ExamModal from '../../components/ExamModal.vue';

import { ref } from 'vue'
import { api } from '../../plugins/api'
import { formatDateTime } from '../../plugins/formatData'
const exams = ref([])


const fetchExams = async () => {
    const { data } = await api.get('/exam?admin=true')

    exams.value = data.exams.map(exam => {
        return {
            ...exam,
            
        }
    })
}


fetchExams()


const deleteExam = async (id) => {
    if (confirm('Are you sure?')) {
        await api.delete(`/exam/${id}`)
        fetchExams()
    }
}



</script>

<style lang="scss" scoped></style>