import { defineStore } from "pinia";
import { api } from "../plugins/api";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useExamStore = defineStore(
  "exams",
  () => {
    const exams = ref([]);
    const allExams = ref([]);

    const subjectExams = ref([]);

    const getExams = async () => {
      let token = JSON.parse(localStorage.getItem("rtpu")).token;

      if (token) {
        const { data } = await api("/exam", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        exams.value = data.exams;
        allExams.value = data.exams;
      } else {
        // retry logic here
        setTimeout(() => {
          getExams();
        }, 5000);
      }
    };

    const upcomingExams = computed(() => {
      return allExams.value.filter((exam) => exam.is_upcoming).reverse();
    });

    const pastExams = computed(() => {
      return exams.value.filter((exam) => exam.is_ended);
    });

    const currentExams = computed(() => {
      return exams.value.filter((exam) => exam.is_running);
    });
    const route = useRoute();
    const getExam = (id = route.params.id) => {
      return exams.value.find((exam) => exam._id == id);
    };

    const curexam = computed(() => {
      return exams.value.find((exam) => route.params.id == exam._id);
    });

    const router = useRouter();

    const getBySubject = (subject) => {
      router.push("/?subject=" + subject);

      subjectExams.value = exams.value.filter(
        (exam) => exam.subject === subject
      );
    };

    const getSetOfSubjects = computed(() => {
      let subjects = exams.value.map((exam) => exam.subject);

      return [...new Set(subjects)];
    });

    const startExam = (id) => {
      router.push(`/exam/${id}`);
    };

    return {
      exams,
      getExams,
      upcomingExams,
      pastExams,
      currentExams,
      getExam,
      getBySubject,
      getSetOfSubjects,
      startExam,
      subjectExams,
      curexam,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
