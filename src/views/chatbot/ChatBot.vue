<template>
  <div
    class="w-full h-full bg-gray-800 mx-auto shadow-lg flex flex-col p-4 text-white"
  >
    <header class="flex items-center gap-3 border-b border-gray-700 pb-3">
      <CgMenuLeftAlt class="text-2xl opacity-70 hover:opacity-100 cursor-pointer" />
      <h2 class="font-bold text-xl tracking-wide">Lawyers Chatbot</h2>
      <HeFilledArtificialIntelligence class="text-2xl ml-auto opacity-80" />
    </header>

    <main
      ref="scrollBox"
      class="flex-1 overflow-auto mt-4 mb-3 pr-2 space-y-4 min-h-0"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex"
        :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
      >
        <div
          class="max-w-[80%] px-4 py-3 rounded-2xl shadow-md"
          :class="
            index % 2 === 0
              ? 'bg-gray-700 text-gray-100'
              : 'bg-blue-500 text-white'
          "
        >
          {{ message }}
        </div>
      </div>
    </main>

    <!-- Tools -->
    <footer class="mt-2">
      <Tools @newMessage="newMessageHandle" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { HeFilledArtificialIntelligence, CgMenuLeftAlt } from '@kalimahapps/vue-icons'
import Tools from './components/Tools.vue'
import { ref, nextTick } from 'vue'

const messages = ref(['Hello, how can i help you?'])

const scrollBox = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (scrollBox.value) scrollBox.value.scrollTop = scrollBox.value.scrollHeight
  })
}

function newMessageHandle(payload: { message: string }) {
  messages.value.push(payload.message)
  messages.value.push('Waiting for server Response')

  scrollToBottom()
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #4b4b4b;
  border-radius: 5px;
}
</style>
