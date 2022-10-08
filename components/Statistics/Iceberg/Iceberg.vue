<script lang="ts" setup>
    import GridGenerator from "./grid-generator";
    import IcebergBackground from "~/assets/svg/Iceberg.svg?component";

    const defaultSize = 10;

    interface Props {
        items: {
            info: string,
            imageSrc: string,
            level: number,
        }[],
        gridItemSize?: number;
    }

    const props = defineProps<Props>();

    const grid = new GridGenerator(props.gridItemSize ?? defaultSize);
</script>

<template>
    <div class="w-full h-full relative">
        <IcebergBackground class="absolute h-full w-full" />
        <img
            v-for="item in props.items"
            :key="item.info"
            class="absolute h-auto"
            :style="{width: `${props.gridItemSize ?? defaultSize}%`, ...grid.getNext(item.level)}"
            :src="item.imageSrc"
            :title="item.info"
        >
    </div>
</template>
