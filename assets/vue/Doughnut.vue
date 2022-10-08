<template>
    <Doughnut :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script lang="ts" setup>
    import { Doughnut } from "vue-chartjs";
    import { Chart as ChartJS, registerables } from "chart.js";
    ChartJS.register(...registerables);

    interface Genre {
        name: string,
        count: number,
    }
    interface Props {
        genres: Genre[],
    }
    const props = withDefaults(defineProps<Props>(), {
        genres: () => [{ name: "Missing Data", count: 1 }],
    });

    const { genres } = toRefs(props);

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

    // testdata
    // ["VueJs", "EmberJs", "ReactJs", "AngularJs"]
    // [40, 20, 80, 10]
    interface ChartData {
        labels: string[],
        datasets: Array<{
            backgroundColor: string[],
            borderColor: string,
            data: number[],
        }>,
    }

    const chartData: ChartData = {
        labels: [],
        datasets: [
            {
                // only 20 distinct background colors
                backgroundColor: ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080"],
                borderColor: "#191414",
                data: [],
            },
        ],
    };

    genres.value.forEach((genre) => {
        chartData.labels.push(genre.name);
        chartData.datasets[0].data.push(genre.count);
    });
</script>
