<template>
  <p>Current Route:</p>
  <p>{{ JSON.stringify({ name: route.name, path: route.path }, null, 2) }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped></style>
