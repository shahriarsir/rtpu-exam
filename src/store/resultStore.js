import {
    defineStore
} from "pinia";
import {
    ref
} from "vue";

export const useResultStore = defineStore('result', () => {
    const result = ref({
        type: '',
        score: 0,
        show: false,
    })

    const showResult = (score, type) => {
        result.value.type = type;
        result.value.score = score;
        result.value.show = true;
    }

   


    const closeModal = () => {

        result.value.show = false;

    }


    return {
        result,
        showResult,
        closeModal,
    }
})