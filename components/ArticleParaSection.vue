<template>
    <div class="article-para-section">
        <p v-for="para in content" :key="para" class="article-para">
            <div v-html="para"></div>
        </p>
    </div>
</template>

<script setup>
const {content} = defineProps(['content']);

</script>

<style lang="scss" scoped>

</style>