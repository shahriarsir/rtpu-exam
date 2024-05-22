<template>
  <div v-if="solution.length > 0 && exists != 'no'">
    <div class="pb-10">
      <div class="py-4 text-center">
        <h1 class="text-2xl font-bold text-green-500 poppins">
          {{ exam.title }} এর উত্তরপত্র
        </h1>
      </div>
      <div class="text-center print:hidden" @click="downloadSolution">
        <button class="btn">
          Download PDF
        </button>
      </div>

      <!-- status -->



      <div class="mx-2 md:w-2/3 md:mx-auto print:text-black" ref="content">

        <div v-for="(q, i) in solution" :key="i"
          class="p-5 mx-auto my-3 text-lg bg-white border border-gray-300 rounded-md shadow-lg print:border-none print:shadow-none print:p-1 kalpurush">
          <div class="inline-flex print:text-black" v-html="`<span class='mr-2'>${i + 1})</span>` + q.question">
          </div>

          <div class="mt-3 space-y-2">
            <div v-for="(o, n) in q.options" :key="n" class="flex flex-col p-3 rounded shadow "
              :class="{ ' bg-green-300 border print:border-gray-900': o == q.answer, 'bg-red-300': !q.isCorrect && o == q.selected }">
              <div v-html="o"></div>

            </div>
          </div>
          <h2 v-if="q.explain" class="my-2 poppins">Explain:</h2>
          <div v-if="q.explain" class="p-3 my-3 bg-gray-200 border border-green-500 rounded print:text-black "
            v-html="q.explain"></div>



          <div class="mt-3">

            <span v-if="q.isCorrect && q.selected" class="font-semibold text-green-500">
              ✅ সঠিক
              উত্তর
            </span>

            <span v-else-if="!q.isCorrect && q.selected" class="font-semibold text-red-500">
              ❌ ভুল উত্তর
            </span>

            <span v-else class="font-semibold text-blue-500">
              ⁉️ উত্তর দেয়া হয়নি
            </span>


          </div>


        </div>
      </div>
    </div>




  </div>

  <div v-else class="flex items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center justify-center -mt-24 space-x-1 text-sm text-gray-700 ">
      <div class="flex justify-center">
        <svg fill="none" class="w-10 h-10 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor" fill-rule="evenodd" />
        </svg>

        <div class="text-lg">Loading ...</div>
      </div>
      <p>You must participate the exam or exam time need to be ended to view solution</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useExamStore } from '../../store/examStore';
import { useUserStore } from '../../store/userStore';
import { formatNumber } from '../../plugins/formatData';
import { api } from '../../plugins/api';

const { getExam } = useExamStore();
const { user, token } = useUserStore()
const exam = getExam();
const solution = ref([]);


const status = ref(null)



const getSolution = async () => {

  if (user) {
    const { data } = await api(`/exam/${exam._id}/solution`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });


    if (data.submission) {
      status.value = {};
      status.value.correct = formatNumber(data.submission.correct);
      status.value.wrong = formatNumber(data.submission.wrong);
      status.value.missing = data.questions.length - (data.submission.correct + data.submission.wrong);
      status.value.total = data.submission.correct - (data.submission.wrong * 0.25)
    }

    solution.value = data.questions.map(q => {
      if (data.submission) {



        let selectedAns = data.submission.answers.find(a => a.id == q.id);
        return {
          ...q,
          selected: selectedAns ? q.options[selectedAns.s] : '',
          isCorrect: selectedAns ? q.options[selectedAns.s] == q.answer : false,
        }
      } else {
        return q;
      }

    })
  }
}

getSolution();

const downloadSolution = () => {
  window.print();
}




</script>

<style lang="scss" scoped></style>