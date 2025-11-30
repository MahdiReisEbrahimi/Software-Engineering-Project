<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from './layout/MainNavigation.vue'
</script>

<template>
  <div class="flex h-screen">
    <MainNavigation class="w-52 shrink-0" />

    <div class="flex-1 mt-16 md:mt-0 md:ml-56 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
