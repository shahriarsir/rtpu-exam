<template>

    <button class="px-4 py-2 font-semibold text-white bg-green-500 rounded-md" @click="showAlert">
        {{ examData ? 'Edit Exam' : 'Schedule Exam' }}
    </button>

    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="closeAlert">
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="min-h-screen px-4 text-center bg-[rgba(0,0,0,0.6)]">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <DialogOverlay class="fixed inset-0" />
                    </TransitionChild>

                    <span class="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <div
                            class="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                Schedule An Exam
                            </DialogTitle>
                            <div class="mt-2">
                                <form @submit.prevent="scheduleExam">
                                    <div class="form-control">
                                        <label for="title" class="label">Title</label>
                                        <input type="text" id="title" v-model="exam.title" class="input input-bordered"
                                            placeholder="Enter Exam Title">
                                    </div>
                                    <div class="form-control">
                                        <label for="subject" class="label">Subject</label>
                                        <input type="text" id="subject" v-model="exam.subject"
                                            class="input input-bordered" placeholder="Enter Exam Subject">
                                    </div>
                                    <div class="form-control">
                                        <label for="question_sheet" class="label">Question Sheet ID</label>
                                        <input type="text" id="question_sheet" v-model="exam.question_sheet"
                                            class="input input-bordered" placeholder="Enter Question Google Sheet ID">
                                    </div>

                                    <div class="grid grid-cols-2 gap-5">
                                        <div class="form-control">
                                            <label for="duration" class="label">Duration</label>
                                            <input type="number" id="duration" v-model="exam.duration"
                                                class="input input-bordered" placeholder="Enter Exam Duration">
                                        </div>
                                        <div class="form-control">
                                            <label for="total_marks" class="label">Total Marks</label>
                                            <input type="number" id="total_marks" v-model="exam.total_marks"
                                                class="input input-bordered" placeholder="Enter Exam Total Marks">
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-5">


                                        <div class="form-control">
                                            <label for="start_time" class="label">Start Time</label>
                                            <input type="datetime-local" id="start_time" v-model="exam.start_time"
                                                class="input input-bordered" placeholder="Enter Exam Start Time">
                                        </div>

                                        <div class="form-control">
                                            <label for="end_time" class="label">End Time</label>
                                            <input type="datetime-local" id="end_time" v-model="exam.end_time"
                                                class="input input-bordered" placeholder="Enter Exam End Time">

                                        </div>

                                        <div class="form-control">
                                            <label for="result_publish_time" class="label">Result Publish Time</label>
                                            <input type="datetime-local" id="result_publish_time"
                                                class="input input-bordered" v-model="exam.result_publish_time"
                                                placeholder="Enter Exam Result Publish Time">
                                        </div>

                                        <div class="form-control">
                                            <label for="solution_publish_time" class="label">Solution Publish
                                                Time</label>
                                            <input type="datetime-local" id="solution_publish_time"
                                                class="input input-bordered" v-model="exam.solution_publish_time"
                                                placeholder="Enter Exam Solution Publish Time">
                                        </div>

                                    </div>

                                    <div class="flex justify-end gap-3 mt-4">
                                        <button type="submit"
                                            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">
                                            Schedule Exam
                                        </button>
                                        <button type="button"
                                            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            @click="closeAlert">
                                            Cancel
                                        </button>
                                    </div>



                                </form>



                            </div>


                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
} from '@headlessui/vue'

import { ref } from 'vue'
import { api } from '../plugins/api';

const { examData } = defineProps(['examData'])

const emits = defineEmits(['close'])


const show = ref(false)

const closeAlert = () => {
    show.value = false
}

const showAlert = () => {
    show.value = true
}

const exam = ref(examData ? {
    ...examData,
    start_time: new Date(new Date(examData.start_time).getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16),
    end_time: new Date(new Date(examData.end_time).getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16),
    result_publish_time: new Date(new Date(examData.result_publish_time).getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16),
    solution_publish_time: new Date(new Date(examData.solution_publish_time).getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16)
} : {
    title: '',
    subject: '',
    question_sheet: '',
    duration: '',
    total_marks: '',
    start_time: '',
    end_time: '',
    result_publish_time: '',
    solution_publish_time: ''
})


const scheduleExam = async () => {
    try {





        if (examData) {
            await api.put(`/exam/${examData._id}`, exam.value)
        } else {
            await api.post('/exam', exam.value)
        }

        closeAlert()

        emits('close')

    } catch (error) {
        console.log(error)
    }
}



</script>

<style lang="scss" scoped></style>