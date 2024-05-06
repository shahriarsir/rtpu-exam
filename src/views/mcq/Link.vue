<template>
  <div v-if="curexam && curexam._id"
    class="p-5 mx-2 my-10 space-y-4 text-center border border-gray-300 rounded-lg md:mx-auto bangla ring ring-primary bg-gray-50 md:w-1/2">
    <div>
      একবার এক্সাম দিতে ঢুকলেই তোমার সময় শুরু হয়ে যাবে। ভুলে বা নেটের সমস্যায় বা
      অন্য যেকোনো কারণে একাধিকবার এক্সাম দেয়ার চেষ্টা করলে র‍্যাংকিং এ তোমার নাম
      সবার নিচে চলে যাবে।
    </div>

    <div>
      <h1 class="text-2xl font-semibold text-green-500">
        {{ curexam.title }}
      </h1>
      <h1 class="mt-3">
        এক্সাম শুরু হবে: <br> {{ formatDateTime(curexam.start_time) }}
      </h1>

    </div>
    <div class="flex justify-center mt-3">
      <router-link :to="`/exam/${curexam._id}`" class="!px-10 bg-primary squared_btn">শুরু করুন</router-link>
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
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useExamStore } from '../../store/examStore';
import { formatDateTime } from '../../plugins/formatData';


const store = useExamStore();

const { curexam } = storeToRefs(store)






</script>

<style lang="scss" scoped></style>