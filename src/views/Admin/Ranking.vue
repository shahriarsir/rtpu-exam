<template>
    <div class="text-center">
        <h1 class="my-4 text-3xl font-bold text-center text-gray-900">ফলাফল</h1>
        <h2>{{ exam.title }}</h2>
        <h3>
            Total Participants: {{ allResults.length }}
        </h3>

    </div>

    <div class="flex justify-between max-w-xl mx-auto my-5">


        <div class="flex gap-4">
            <div class="">
                <input type="number" v-model="negMark" class="input input-bordered" placeholder="Negative Marks">

            </div>
            <button @click="calculateResult" class="px-5 py-2 font-semibold text-white bg-blue-500 rounded-md">
                {{ loading ? 'Calculating...' : 'Calculate Result' }}
            </button>
        </div>

        <button @click="exportToCsv" class="px-5 py-2 font-semibold text-white bg-green-500 rounded-md">
            Export to CSV
        </button>


    </div>

    <div class="max-w-xl mx-auto my-3">



        <div class="form-control">
            <input placeholder="শিক্ষার্থী অথবা শিক্ষাপ্রতিষ্ঠানের নাম দিয়ে খুঁজুন... " @keyup="search"
                class="rounded-md input input-bordered" />
        </div>
        <div class="mt-4">
            <div v-if="allResults.length > 0">
                <div v-for="(r, i) in searchResults" :key="i"
                    class="flex items-center px-3 py-2 mb-2 border shadow-sm rounded-2xl">
                    <span
                        class="flex items-center justify-center w-10 h-10 font-semibold text-white bg-green-500 rounded-full">{{

            formatNumber(r.position)
        }}</span>
                    <div class="flex-1 ml-2 text-gray-900 md:ml-4">
                        <h2 class="text-lg font-semibold">{{ r.name }}</h2>
                        <p>{{ r.college }}</p>
                        <p class="text-sm text-gray-500">
                            Attempts: {{ r.attempt }},
                            সময়:
                            {{ (r.duration) }} মিনিট

                            <spa
                                :class="{ 'text-green-500': r.status === 'completed', 'text-red-500': r.status === 'pending' }">
                                Status: {{ r.status === 'completed' ? 'Calculated' : 'Not Calculated' }}

                            </spa>
                        </p>
                    </div>
                    <div
                        class="flex items-center justify-center w-10 h-10 p-2 font-semibold text-center text-gray-900 rounded-full aspect-square">
                        <span>
                            {{
            (r.score) }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <button class="btn loader btn-primary">Loading...</button>
            </div>
        </div>
    </div>
</template>

<script setup>


import { useExamStore } from '../../store/examStore';
import _ from 'lodash';
import { ref } from 'vue';
import { useUserStore } from '../../store/userStore';
import { formatNumber, millisecToTime } from '../../plugins/formatData';
import { api } from '../../plugins/api';
const { getExam } = useExamStore();

const exam = getExam();

const allResults = ref([]);

const searchResults = ref([]);

const myscore = ref(null)

const { user } = useUserStore()

const loading = ref(false);
const negMark = ref(false);

const getResults = async () => {

    // if (!exam.result_is_published) {
    //     return
    // }


    let { data } = await api.get(`/exam/${exam._id}/leaderboard?admin=true`);


    allResults.value = data.map((r, i) => {
        return {
            position: i + 1,
            duration: millisecToTime(r.duration, exam.duration * 60000),
            score: r.marks,
            name: r.user.name,
            phone: r.user.phone,
            attempt: r.attempt,
            college: r.user.institute,
            status: r.status,
        }
    });

    searchResults.value = allResults.value;

};

getResults()


const search = (e) => {
    let value = e.target.value;
    if (value) {
        searchResults.value = allResults.value.filter((r) => r.name.toLowerCase().includes(value.toLowerCase()));
    } else {
        searchResults.value = allResults.value;
    }
}



const calculateResult = async () => {
    loading.value = true;
    const password = prompt('Enter password to calculate result');
    let { data } = await api.post(`/exam/${exam._id}/calculate-result?password=${password}&negmark=${negMark.value}`);
    loading.value = false;
    getResults()

}



const exportToCsv = () => {
    let csv = 'Position,Name,College,Phone,Duration,Score\n';
    allResults.value.forEach((r) => {
        csv += `${r.position},${r.name},${r.college.replace(/\,/g, " ")},${r.phone},${r.duration},${r.score}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${exam.title}.csv`);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

}


const deleteResult = async (id) => {

    const password = prompt('Enter password to calculate result');



    let { data } = await api.delete(`/exam/${exam._id}/result/${id}?password=${password}`);
    getResults()
}



</script>

<style lang="scss" scoped></style>