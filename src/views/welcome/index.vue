<script lang="ts" setup>
import { getList } from "@/api"
import { onMounted } from "vue"
onMounted(() => {
    getList().then((res) => {
        console.log(res)
    })
})
</script>

<template>
    <div>welcome</div>
</template>
