<template>
  <div v-if="(!qload && !retake) && (exam.is_ended || hasParticiapted)"
    class="flex items-center justify-center min-h-[80vh]">
    <div class="max-w-md p-5 m-4 mx-auto space-y-4 text-center border bg-slate-100 rounded-2xl outline-dashed">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ exam.title }}
      </h1>
      <p class="text-lg text-gray-700">
        {{ exam.subject }}
      </p>
      <p v-if="hasParticiapted">
        You have already participated in this exam.
      </p>
      <p v-else>
        {{ exam.is_ended ? "Exam has ended" : "" }}
      </p>
    </div>
  </div>
  <div class="container mx-auto" v-else-if="!qload || retake">
    <div v-if="questions.length > 0" class="pb-10">
      <div class="py-4 text-center">
        <h1 class="text-2xl font-bold text-gray-900" v-html="exam.title"></h1>

      </div>
      <div class="mx-2 md:w-2/3 md:mx-auto">
        <div v-for="(q, i) in questions" :key="i"
          class="p-5 mx-auto my-3 text-lg bg-white border border-gray-300 rounded-md shadow-lg kalpurush"
          :class="{ 'stop-events': questions[i].selected }">

          <div class="mb-2 text-lg font-semibold text-gray-900" v-html="q.question"></div>

          <div class="flex gap-2">
            <button class="btn btn-sm">Q No: {{ i + 1 }}</button>
            <button class="btn btn-sm">Marks: {{ 1 }}</button>
          </div>
          <div class="mt-3">

            <div v-for="o, n in q.options" :key="n" v-html="o" @click="selectOption(i, o)" :class="`cursor-pointer transform hover:scale-105 transition duration-150 hover:font-semibold text-black  my-3 p-3 rounded    ${o == q.selected
    ? 'border-2 border-green-500 bg-green-300'
    : ' bg-white border'
    }`"></div>

          </div>

        </div>

        <div class="mb-10 text-center ">
          <button @click="submitAns('submitted')" :disabled="eload" class="shadow-md btn" :class="{ 'loading': eload }">
            {{ eload ? "Loading..." : "Submit" }}
          </button>
        </div>
      </div>



    </div>
    <div class="fixed__timer" v-if="show">
      <ExamTimer :end_time="end_time"></ExamTimer>
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
  <Result />
</template>

<script setup>
import { ref } from 'vue';
import { useExamStore } from '../../store/examStore';
import ExamTimer from '../../components/ExamTimer.vue'
import { useUserStore } from '../../store/userStore';
import Alert from '../../components/Alert.vue';
import Result from '../../components/Result.vue';
import { useAlertStore } from '../../store/alertStore';
import { useResultStore } from '../../store/resultStore';
import { useRouter } from 'vue-router';
import { api } from '../../plugins/api';



const { successShow } = useAlertStore()
const { showResult } = useResultStore()

const questions = ref([]);
const show = ref(true);
const eload = ref(false);
const qload = ref(true);
const examStart = ref(Date.now());
const hasParticiapted = ref(false);
const router = useRouter()
const retake = ref(false);
const { getExam } = useExamStore()
const exam = getExam();
const end_time = ref(null)

const getQuestions = async () => {
  qload.value = true;
  const { data } = await api(`/exam/${exam._id}/question`, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("rtpu")).token,
    },
  })
  questions.value = data.questions
  hasParticiapted.value = data.hasParticiapted
  let duration = exam.duration
  end_time.value = Date.now() + (duration * 60000)
  let attempt = localStorage.getItem(
    `medi24attempt${exam._id}`
  );
  if (attempt) {
    localStorage.setItem(
      `medi24attempt${exam._id}`,
      Number(attempt) + 1
    );
  } else {
    localStorage.setItem(
      `medi24attempt${exam._id}`,
      1
    );
  }
  examStart.value = Date.now()
  setTimeout(() => {
    submitAns()
  }, (duration * 60000))

  qload.value = false

}

getQuestions();

const practiceNow = () => {

  retake.value = true
  show.value = true;
  end_time.value = Date.now() + (exam.duration * 60000)
  setTimeout(() => {
    submitAns()
  }, (exam.duration * 60000))


}
const selectOption = (i, o) => {
  questions.value[i].selected = o;
}

const { token } = useUserStore()


if (!token) {
  router.replace('/login')
}


const submitAns = async () => {

  try {
    eload.value = true;
    let squestions = questions.value.map((q) => {
      let s = q.options.indexOf(q.selected)
      return {
        id: q.id,
        s
      }
    }).filter(k => k.s > -1)

    if (retake.value) {
      let score = questions.value.reduce((a, c) => {
        if (c.answer == c.selected) {
          a += 1;
        }
        return a;
      }, 0);
      showResult(
        score,
        "retake"

      )

      retake.value = false
      eload.value = false

      return
    }


    let attempt = Number(localStorage.getItem(
      `medi24attempt${exam._id}`
    ));

    const { data } = await api.post('/exam/submit', {
      exam: exam._id,
      attempt,
      answers: squestions,
      duration: Date.now() - examStart.value
    }, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("rtpu")).token,
      },
    })

    successShow('Submitted successfully', 'Wait for the result to be published.')

    setTimeout(() => {
      router.replace('/')
    }, 3000)

    eload.value = false;
  } catch (error) {
    console.log(error);
  }

}




</script>


<style lang="css" scoped>
.fixed__timer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  color: white;
  font-size: 22px;
  position: fixed;
  bottom: 0;
}

.fixed__timer>div {
  font-size: 20px;

  padding: 10px;

  border-radius: 5px;
}

.solution {
  border: 1px solid rgba(black, 0.2);
  border-radius: 4px !important;
  background: linear-gradient(45deg, #f7f4f4, #d8d6d6b4) !important;
  box-shadow: 2px 2px 2px #c2c0c0, -2px -2px 4px #ffffff !important;

}

.solution>div {
  color: black;
}

.solution>p {
  color: black;
}

.examcontainer {
  background: rgba(255, 255, 255, 0.09) !important;
  backdrop-filter: blur(5px);
}

.examcontainerq {
  background: rgba(255, 255, 255, 0.774) !important;
  backdrop-filter: blur(5px);
}

.stop-events {
  /* 
    cursor: not-allowed;
    pointer-events: none; 
  */

  opacity: 0.99;
}
</style>
