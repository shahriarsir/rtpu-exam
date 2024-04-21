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
import { useRouter } from "vue-router";

const router = useRouter();



let currentPath = localStorage.getItem("path");
if (currentPath) {
  localStorage.removeItem("path");
  router.replace(currentPath);
}


</script>

<style lang="scss" scoped></style>