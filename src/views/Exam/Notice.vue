<template>
    <div class="grid gap-5 p-5 m-2 mx-auto border rounded-lg md:max-w-4xl md:grid-cols-2">
        <div class="flex flex-col justify-center m-2">
            <h1 class="text-2xl font-bold text-center">
                বিষয় নির্বাচনের নির্দেশনাবলী
            </h1>
            <ul class="mt-5 space-y-3">
                <li>১) আবশ্যিক বিষয় হিসেবে পদার্থবিজ্ঞান এবং রসায়ন সকলের জন্যেই সিলেক্টেড থাকবে।</li>
                <li>
                    ২) পদার্থবিজ্ঞান এবং রসায়ন ছাড়াও অন্যান্য বিষয় থেকে আরও দুইটি বিষয় নিয়ে সর্বমোট ৪টি বিষয়ে পরীক্ষা
                    দিতে
                    হবে।
                </li>
                <li>
                    ৩) জীববিজ্ঞান অথবা উচ্চতর গণিত থেকে যেকোনো একটি অথবা উভয়টিই সিলেক্ট করতে পারবে।
                </li>
                <li>
                    ৪) চতুর্থ বিষয়ের পরিবর্তে বাংলা অথবা ইংরেজি এর যেকোনো একটি বিষয় সিলেক্ট করতে পারবে।
                </li>
            </ul>
        </div>
        <div class="w-full mx-auto text-center ">




            <h1 class="mb-2 text-2xl font-bold text-sky-500"></h1>
            <p class="text-lg font-medium">
                আবশ্যিক বিষয়সমূহ
            </p>

            <div class="mt-3 space-y-5">
                <div class="grid grid-cols-2 gap-3">
                    <!-- :class="(s === s1 || s === s2) ? 'btn btn-success' : 'btn btn-outline'" -->
                    <button v-for="s in ['পদার্থবিজ্ঞান', 'রসায়ন']"
                        class="flex items-center justify-between space-x-2 btn btn-outline">
                        <span>
                            {{ s }}
                        </span>
                        <span class="p-1 text-white bg-green-500 rounded-full material-icons">
                            check
                        </span>
                    </button>
                </div>
                <p class="text-lg font-semibold text-red-500">যে কোন দুইটি ঐচ্ছিক বিষয় নির্বাচন করো </p>

                <div class="grid grid-cols-2 gap-3">
                    <!-- :class="(s === s1 || s === s2) ? 'btn btn-success' : 'btn btn-outline'" -->

                    <button v-for="(s, i) in subjects"
                        class="flex items-center justify-between space-x-2 btn btn-outline" @click="selectSubject(s)">
                        <span>
                            {{ sbangla[s] }}
                        </span><span class="p-1 text-white bg-green-500 rounded-full material-icons"
                            v-if="(s === s1 || s === s2)">
                            check
                        </span>
                    </button>
                </div>


                <div v-if="s1 || s2" class="text-lg">
                    <p class="text-2xl font-bold"> নির্বাচিত বিষয়সমূহ </p>

                    <ul class="grid grid-cols-4 gap-2">
                        <li class="px-1 py-2 bg-gray-200 rounded shadow"> পদার্থবিজ্ঞান </li>
                        <li class="px-1 py-2 bg-gray-200 rounded shadow"> রসায়ন </li>
                        <li class="px-1 py-2 bg-gray-200 rounded shadow" v-if="s1"> {{ sbangla[s1] }}</li>
                        <li class="px-1 py-2 bg-gray-200 rounded shadow" v-if="s2"> {{ sbangla[s2] }}</li>
                    </ul>
                </div>

                <div class="px-3 py-2 font-semibold text-white bg-red-500 rounded" v-if="alert">
                    {{ alert }}
                </div>


                <div>
                    <button class="btn" @click="startExam($route.params.id)">Start Exam</button>
                </div>


            </div>


        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const subjects = [
    'Biology',
    'Math',
    'Bangla',
    'English'
];

const sbangla = {
    'Biology': 'জীববিজ্ঞান',
    'Math': 'উচ্চতর গণিত',
    'Bangla': 'বাংলা',
    'English': 'ইংরেজী'
}


const s1 = ref('');
const s2 = ref('');

const alert = ref('');
// student if student selects Biology and Math can't select from Bangla and English

const selectSubject = (subject) => {

    if (subject == 'Bangla' || subject == 'English') {
        s2.value = subject;
        return
    } else if (subject == 'Biology' || subject == 'Math') {
        if (s1.value == '') {
            s1.value = subject;
        } else if (s2.value == '' && s1.value != subject) {
            s2.value = subject;
        } else {
            s1.value = subject;
            s2.value = '';
        }
    }



}
const router = useRouter();

const startExam = (id) => {
    if (s1.value == '' || s2.value == '') {
        alert.value = 'নির্দেশনা অনুযায়ী অবশ্যই তোমাকে দুইটি ঐচ্ছিক বিষয় নির্বাচন করতে হবে';
        return
    }
    router.push(`/exam/${id}?s1=${s1.value}&s2=${s2.value}`);

}

</script>

<style lang="scss" scoped>

</style>


