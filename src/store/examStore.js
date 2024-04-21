import { defineStore } from "pinia";
import { api } from "../plugins/api";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useExamStore = defineStore(
  "exams",
  () => {
    const exams = ref([]);

    const subjectExams = ref([]);

    const getExams = async () => {
      const { data } = await api("/exam",{
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("omarfarukuser")).token,
        },
      });
      exams.value = data.exams;
    };

    const upcomingExams = computed(() => {
      return exams.value.filter((exam) => exam.is_upcoming);
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
