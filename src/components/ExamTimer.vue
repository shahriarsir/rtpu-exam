<template>
    <div>
        <div class="text-2xl btn">
            {{ minute }} : {{ second }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        end_time: {
            type: Number,
            required: true

        }
    },

    data() {
        return {
            minute: 0,
            second: 0
        }
    },

    mounted() {
        this.startTimer();
    },

    methods: {
        startTimer() {
            // timer will be stopped at end_time
            let end_time = new Date(this.end_time).getTime();
            let timer = setInterval(() => {
                let now = new Date().getTime();
                let distance = end_time - now;
                let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let second = Math.floor((distance % (1000 * 60)) / 1000);
                this.minute = minute;
                this.second = second;
                if (distance < 0) {
                    clearInterval(timer);
                }
            }, 1000);

        },

        stopTimer() {
            clearInterval(this.interval);
        }

    }
}
</script>

<style lang="css" scoped></style>
