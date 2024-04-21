<template>
<!--  <SingleUpload :max-size="20 * 1024 * 1024" />-->
  <MultipleUpload :max-count="1" />
</template>

<script setup>
// import SingleUpload from "../components/SingleUpload.vue";
import MultipleUpload from "./components/MultipleUpload.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
