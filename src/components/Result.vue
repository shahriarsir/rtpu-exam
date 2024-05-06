<template>
  <TransitionRoot appear :show="result.show" as="template">
    <Dialog as="div" @close="closeAlert">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center bg-[rgba(0,0,0,0.6)]">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

              <div class="mt-2">
                <img  class="mx-auto h-36" src="../assets/submit.png" alt="">
                <p class="text-2xl font-semibold text-center ">
                  You scored: {{ result.score }}
                </p>
              </div>

              <div class="mt-4 text-right">
                <button type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeAlert">
                  Got it, thanks!
                </button>
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

} from '@headlessui/vue'

import { useResultStore } from '../store/resultStore';
import { storeToRefs } from 'pinia';


const resultStore = useResultStore();

const { result } = storeToRefs(resultStore);

const closeAlert = () => {
  resultStore.closeModal();

}



</script>

<style lang="scss" scoped></style>