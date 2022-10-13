<template>
    <Radar :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script lang="ts" setup>
    import { Radar } from "vue-chartjs";
    import { Chart as ChartJS, registerables, ChartOptions } from "chart.js";
    import { TChartData } from "vue-chartjs/dist/types";
    ChartJS.register(...registerables);

    interface Element {
        name: string,
        value: number
    }
    interface Props {
        data: Element[],
    }

    const props = defineProps<Props>();

    const chartOptions: ChartOptions<"radar"> = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            r: {
                angleLines: { // line from center to each element
                    display: false,
                },
                beginAtZero: true,
                pointLabels: { // display element-labels
                    display: true,
                    color: "white",
                    // backdropColor: "gray",
                    // borderRadius: 5,
                },
                ticks: { // units
                    display: false,
                },
                grid: {
                    display: true,
                    color: "gray",
                },
            },
        },
    };

    // spotify-colors
    const primaryColor = "#1DB954"
    const primaryAlpha = "#1DB95444"
    const secondaryColor = "#eeeeee"
    // blue-ish color
    // const primaryColor = "#36A2EB"
    // const primaryAlpha = "#36A2EB44"
    // const secondaryColor = "#eeeeee"

    const chartData: TChartData<"radar"> = {
        labels: [],
        datasets: [{
            data: [],
            fill: true,
            borderWidth: 3,
            backgroundColor: primaryAlpha,
            borderColor: primaryColor,
            pointBackgroundColor: primaryColor,
            pointBorderColor: secondaryColor,
            pointHoverBackgroundColor: secondaryColor,
            pointHoverBorderColor: secondaryColor,
        }],
    };

    props.data.forEach((element) => {
        chartData.labels?.push(element.name);
        chartData.datasets[0].data.push(element.value);
    });

</script>
