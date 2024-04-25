
<template>
  <SingleUpload :max-size="20 * 1024 * 1024"  :typesSingle="'application/zip'"/>

  <MultipleUpload :max-size="20 * 1024 * 1024" :max-element-count="5"  multipl="true"   />
</template>

<script setup lang="ts">
import SingleUpload from "./components/SingleUpload.vue";
import MultipleUpload from "./components/MultipleUpload.vue";
</script>

