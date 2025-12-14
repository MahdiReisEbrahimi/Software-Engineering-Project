<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from './layout/MainNavigation.vue'
</script>

<template>
  <div class="flex h-screen">
    <MainNavigation />

    <div class="flex-1 mt-16 md:mt-0 md:mr-56 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
