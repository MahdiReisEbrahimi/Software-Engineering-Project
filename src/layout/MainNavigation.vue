<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { CaUserAvatarFilled } from '@kalimahapps/vue-icons'
import { BsPersonFillAdd } from '@kalimahapps/vue-icons'
import { HeFilledArtificialIntelligence } from '@kalimahapps/vue-icons'
import { MiSolidArticle } from '@kalimahapps/vue-icons';
import { CoBrandAboutMe } from '@kalimahapps/vue-icons';
import { HeOutlineCityWorker } from '@kalimahapps/vue-icons';
import { FaMapLocationDot } from '@kalimahapps/vue-icons';

const isOpen = ref(false)

const router = useRouter()
const allRoutes = router.getRoutes()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const iconComponents: Record<string, Component> = {
  CaUserAvatarFilled,
  BsPersonFillAdd,
  HeFilledArtificialIntelligence,
  MiSolidArticle,
  CoBrandAboutMe,
  HeOutlineCityWorker,
  FaMapLocationDot,
}
</script>

<template>
  <!-- Desktop Sidebar -->
  <aside
    class="hidden md:flex fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-6 shadow-xl overflow-y-auto"
  >
    <ul class="flex flex-col gap-4 text-lg">
      <li v-for="route in allRoutes" :key="route.name" class="hover:bg-gray-700 px-2 py-2 rounded">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
  </aside>

  <!-- Mobile Top Navigation -->
  <nav
    class="md:hidden flex items-center justify-between bg-gray-700 text-white fixed top-0 left-0 right-0 z-40"
  >
    <div class="text-xl font-bold">-----</div>

    <button class="focus:outline-none w-10" @click="toggleMenu">
      <img src="@/icons/burger.svg" alt="burger" />
    </button>
  </nav>

  <!-- Mobile Dropdown Menu -->
  <transition name="dropdown">
    <div
      v-if="isOpen"
      class="md:hidden absolute top-14 left-0 right-0 bg-gray-800 text-white z-30 shadow-lg"
    >
      <ul class="flex flex-col text-lg">
        <li
          v-for="route in allRoutes"
          :key="route.name"
          class="flex justify-start items-center gap-2 pl-4 h-12 hover:bg-gray-700 items-middle align-middle w-full cursor-pointer"
        >
          <component :is="iconComponents[route.meta?.icon as string]" />
          <router-link
            @click="isOpen = false"
            :to="route.path"
            class="w-full block p-0 m-0 hover:bg-gray-700 py-2"
          >
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-enter-active {
  transition: 0.2s ease;
}
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-leave-active {
  transition: 0.2s ease;
}
</style>
