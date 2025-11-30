<template>
  <div class="flex items-center gap-2 bg-gray-900 p-2 rounded-xl shadow-inner">
    <input
      v-model="text"
      type="text"
      class="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Ask your question..."
      @keyup.enter="handleMessageSend"
    />

    <button
      class="p-2 rounded-lg transition hover:scale-110 disabled:opacity-40"
      :disabled="!text.trim()"
      @click="handleMessageSend"
    >
      <BsArrowUpSquareFill v-show="text.trim().length > 0" class="text-3xl h-full text-blue-500" />
      <McSleepFill v-show="text.trim().length === 0" class="text-3xl h-full text-blue-500"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { BsArrowUpSquareFill } from '@kalimahapps/vue-icons'
import { McSleepFill } from '@kalimahapps/vue-icons';
import { ref } from 'vue'

const emit = defineEmits({
  newMessage: (payload: { message: string }) => true,
})

const text = ref('')

function handleMessageSend() {
  if (!text.value.trim()) return
  emit('newMessage', { message: text.value })
  text.value = ''
}
</script>
