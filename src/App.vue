<template>
  <div>
    <div class="container py-3 mx-auto print:hidden sm:px-6 lg:px-8 bangla"
      v-if="$route.name != 'MCQ' && $route.name != 'CQ'">
      <router-link to="/">
        <img src="https://shahriarsir.com/assets/logo.svg" class="mx-auto h-14" alt="">
      </router-link>

    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useExamStore } from "./store/examStore";
import { useUserStore } from "./store/userStore";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();

const { user, token } = useUserStore();

const { getExams, exams } = useExamStore();

if (!exams.length) {
  getExams();
}

let currentPath = localStorage.getItem("path");
if (currentPath) {
  localStorage.removeItem("path");
  router.replace(currentPath);
}

onMounted(() => {
  if (user.value) {
    window.clarity("identify", user.value.phone, user.value._id, route.path, user.value.name)
  }
});

</script>

<style lang="scss" scoped></style>