<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useRouter } from 'vue-router'
import {
  CaUserAvatarFilled,
  FaMapLocationDot,
  BsPersonFillAdd,
  HeFilledArtificialIntelligence,
  MiSolidArticle,
  CoBrandAboutMe,
  HeOutlineCityWorker,
  LaThinkPeaks,
  AnOutlinedClose,
  ChMenuHamburger,
} from '@kalimahapps/vue-icons'

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
    class="hidden sm:flex flex-col fixed inset-y-0 left-0 w-56 bg-black text-white shadow-xl overflow-y-auto"
  >
    <div class="flex items-center gap-2 text-2xl font-bold mt-5 ml-5">
      <LaThinkPeaks />
      <h1>My APP</h1>
    </div>
    <ul class="flex flex-col text-lg w-full mt-5">
      <li
        v-for="route in allRoutes"
        :key="route.name"
        class="h-12 items-middle align-middle w-full cursor-pointer"
      >
        <router-link
          @click="isOpen = false"
          :to="route.path"
          class="w-full p-0 m-0 h-full flex items-center hover:bg-gray-700"
        >
          <div class="flex justify-start items-center gap-7 pl-7">
            <component :is="iconComponents[route.meta?.icon as string]" />
            {{ route.name }}
          </div>
        </router-link>
      </li>
    </ul>
  </aside>

  <!-- Mobile Top Navigation -->
  <nav
    class="md:hidden flex items-center justify-between p-4 bg-gray-700 text-white fixed top-0 left-0 right-0 z-40"
  >
    <div class="text-xl font-bold ml-4">My APP</div>

    <button class="focus:outline-none text-2xl" @click="toggleMenu">
      <ChMenuHamburger v-show="!isOpen" />
      <AnOutlinedClose v-show="isOpen" />
    </button>
  </nav>

  <!-- Mobile Dropdown Menu -->
  <transition name="dropdown">
    <div
      v-if="isOpen"
      class="md:hidden absolute top-16 left-0 right-0 bg-gray-800 text-white z-30 shadow-lg"
    >
      <ul class="flex flex-col text-lg">
        <li v-for="route in allRoutes" :key="route.name" class="w-full cursor-pointer">
          <router-link
            @click="isOpen = false"
            :to="route.path"
            class="w-full block hover:bg-gray-700 py-2 pl-8"
          >
            <div class="flex items-center gap-5">
              <component :is="iconComponents[route.meta?.icon as string]" />
              {{ route.name }}
            </div>
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
