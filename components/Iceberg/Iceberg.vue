<template>
    <div class="relative">
        <IcebergBackground class="absolute h-full w-full" />
        <IcebergItem v-if="items[0]" :img="items[0].img" :text="items[0].text" overwater class="absolute left-[35%] top-[10%]" />
        <IcebergItem v-if="items[1]" :img="items[1].img" :text="items[1].text" overwater class="absolute left-[25%] top-[20%]" />
        <IcebergItem v-if="items[2]" :img="items[2].img" :text="items[2].text" overwater class="absolute left-[40%] top-[20%]" />
        <IcebergItem v-if="items[3]" :img="items[3].img" :text="items[3].text" overwater class="absolute left-[55%] top-[20%]" />
        <IcebergItem v-if="items[4]" :img="items[4].img" :text="items[4].text" overwater class="absolute left-[15%] top-[30%]" />
        <IcebergItem v-if="items[5]" :img="items[5].img" :text="items[5].text" overwater class="absolute left-[32%] top-[30%]" />
        <IcebergItem v-if="items[6]" :img="items[6].img" :text="items[6].text" overwater class="absolute left-[48%] top-[30%]" />
        <IcebergItem v-if="items[7]" :img="items[7].img" :text="items[7].text" overwater class="absolute left-[65%] top-[30%]" />
        <div class="absolute inset-x-[10%] top-[38%] bottom-0 grid grid-cols-5 grid-rows-4 place-items-center">
            <template v-for="(item, index) in items.slice(8, 29)" :key="index + item">
                <IcebergItem v-if="item" :img="item.img" :text="item.text" class="w-10 h-10" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import IcebergBackground from "~/assets/svg/Iceberg.svg?component";

    interface Props {
        data: Array<null | {
            img: string,
            text: string,
        }>,
    };

    const props = defineProps<Props>();

    const items = toRefs(props).data;
</script>
