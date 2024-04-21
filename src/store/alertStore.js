import {
    defineStore
} from "pinia";
import {
    computed,
    ref
} from "vue";

export const useAlertStore = defineStore('alert', () => {

    const upcomingAlertData = ref({
        show: false,
        title: '',
        message: ''
    })

    function successShow(title, message) {
        upcomingAlertData.value = {
            show: true,
            title: title,
            message: message
        }
    }


    function upcomingAlert(title, t) {
        upcomingAlertData.value = {
            show: true,
            title: `${title} will be available soon`,
            message: `Please check back after the time ${t}.`
        }
    }

    function closeAlert() {
        upcomingAlertData.value = {
            show: false,
            title: '',
            message: ''
        }
    }



    return {
        upcomingAlertData,
        upcomingAlert,
        closeAlert,
        successShow
    }
})