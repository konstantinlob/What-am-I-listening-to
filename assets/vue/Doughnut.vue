<template>
    <Doughnut :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script lang="ts" setup>
    import { Doughnut } from "vue-chartjs";
    import { Chart as ChartJS, registerables } from "chart.js";
    ChartJS.register(...registerables);

    const chartData = {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
            {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                borderColor: "#191414",
                data: [40, 20, 80, 10],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "white",
                },
            },
        },
    };

</script>
