<template>
    <Doughnut :chart-data="chartData" :chart-options="chartOptions" :plugins="[backgroundImagePlugin]" />
</template>

<script lang="ts" setup>
    import { Doughnut } from "vue-chartjs";
    import { Chart as ChartJS, Plugin, ChartOptions, registerables } from "chart.js";
    ChartJS.register(...registerables);

    interface DataPoint {
        name: string,
        count: number,
    }
    interface Props {
        doughnutData: DataPoint[],
    }
    const props = withDefaults(defineProps<Props>(), {
        doughnutData: () => [{ name: "Missing Data", count: 1 }],
    });

    const { doughnutData } = toRefs(props);

    const chartOptions: ChartOptions = {
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

    const image = new Image();
    image.src = "~/assets/svg/WAILT_logo.svg";
    image.onerror = console.error;

    const backgroundImagePlugin: Plugin = {
        id: "background-logo",
        beforeDraw: (chart) => {
            if(image.complete){
                const ctx = chart.ctx;
                const {top, left, width, height} = chart.chartArea;
                const x = left + width / 2 - image.width / 2;
                const y = top + height / 2 - image.height / 2;
                ctx.drawImage(image, x, y);
            } else {
                image.onload = () => chart.draw();
            }
        }
    }

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

    doughnutData.value.forEach((dataPoint) => {
        chartData.labels.push(dataPoint.name);
        chartData.datasets[0].data.push(dataPoint.count);
    });
</script>
