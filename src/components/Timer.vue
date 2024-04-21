<template>
    <div class="space-x-3">
        <div
            class="inline-flex flex-col items-center justify-center w-16 h-16 my-2 text-gray-800 bg-gray-300 rounded-full dark:bg-white sm:w-20 sm:h-20 ring-2 ring-offset-1 ring-red-500">
            <h2 class="text-xl font-bold">{{ (days) }}</h2>
            <p class="text-sm">Days</p>
        </div>
        <div
            class="inline-flex flex-col items-center justify-center w-16 h-16 my-2 text-gray-800 bg-gray-300 rounded-full dark:bg-white sm:w-20 sm:h-20 ring-2 ring-offset-1 ring-blue-400">
            <h2 class="text-xl font-bold">{{ (hours) }}</h2>
            <p class="text-sm">Hours</p>
        </div>
        <div
            class="inline-flex flex-col items-center justify-center w-16 h-16 my-2 text-gray-800 bg-gray-300 rounded-full dark:bg-white sm:w-20 sm:h-20 ring-2 ring-offset-1 ring-indigo-400">
            <h2 class="text-xl font-bold">{{ (minute) }}</h2>
            <p class="text-sm">Minutes</p>
        </div>
        <div
            class="inline-flex flex-col items-center justify-center w-16 h-16 my-2 text-gray-800 bg-gray-300 rounded-full dark:bg-white sm:w-20 sm:h-20 ring-2 ring-offset-1 ring-emerald-400">
            <h2 class="text-xl font-bold">{{ (second) }}</h2>
            <p class="text-sm">Seconds</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "timer",
    props: {
        end: {
            requiblue: true,
        },
    },
    data() {
        return {
            days: 0,
            hours: 0,
            minute: 0,
            second: 0,
        };
    },
    methods: {

        

        showRemaining() {
            const timer = setInterval(() => {
                const distance = this.end - Date.now();

                if (distance < 0) {
                    clearInterval(timer);
                    return;
                }
                const days = Math.floor(distance / this._days);
                const hours = Math.floor((distance % this._days) / this._hours);
                const minutes = Math.floor((distance % this._hours) / this._minutes);
                const seconds = Math.floor((distance % this._minutes) / this._seconds);
                this.second = seconds < 10 ? "0" + seconds : seconds;
                this.minute = minutes < 10 ? "0" + minutes : minutes;
                this.hours = hours < 10 ? "0" + hours : hours;
                this.days = days < 10 ? "0" + days : days;
            });
        },
    },

    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60;
        },
        _hours() {
            return this._minutes * 60;
        },
        _days() {
            return this._hours * 24;
        },
    },
    mounted() {
        this.showRemaining();
    },
};
</script>

