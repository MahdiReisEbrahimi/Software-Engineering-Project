<template>
  <div class="relative text-xs" :class="width" ref="root">
    <!-- Label -->
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Trigger -->
    <button
      type="button"
      :disabled="disabled"
      @click="toggle"
      @keydown.down.prevent="openDropdown"
      @keydown.up.prevent="openDropdown"
      @keydown.enter.prevent="selectHighlighted"
      @keydown.esc.prevent="close"
      class="w-full flex justify-between items-center rounded-lg border px-2 py-1.5 text-xs transition"
      :class="[
        disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-400' : 'border-gray-300',
        rtl ? '' : 'flex-row-reverse text-right',
      ]"
    >
      <span class="truncate">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="text-xs">▾</span>
    </button>

    <!-- Dropdown -->
    <transition name="dropdown">
      <ul
        v-if="open"
        class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow"
        :class="rtl ? 'text-right right-0' : 'text-left left-0'"
      >
        <li v-if="searchable" class="p-2">
          <input
            v-model="search"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full rounded border px-2 py-1 text-xs outline-none"
          />
        </li>

        <li
          v-for="(option, i) in filteredOptions"
          :key="option.value"
          @click="select(option)"
          @mouseenter="highlightedIndex = i"
          class="px-3 py-2 cursor-pointer text-xs"
          :class="[i === highlightedIndex ? 'bg-gray-100' : '', rtl ? 'text-right' : 'text-left']"
        >
          <span v-if="option.icon" class="mr-2" :class="rtl ? 'ml-2 mr-0' : ''">{{
            option.icon
          }}</span>
          {{ option.label }}
        </li>

        <li v-if="filteredOptions.length === 0" class="px-3 py-2 text-xs text-gray-400">
          {{ emptyText }}
        </li>
      </ul>
    </transition>

    <!-- Error -->
    <p v-if="error" class="mt-1 text-xs text-red-500" :class="rtl ? 'text-right' : 'text-left'">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
// use Example :

//     <ReusableSelect
//       v-model="userType"
//       :options="options"
//       label="نوع کاربر"
//       placeholder="انتخاب کنید"
//       required=""
//       searchable
//       rtl
//       error="انتخاب نوع کاربر الزامی است"
//     />

//    const options: SelectOption[] = [
//      { label: 'کاربر عادی', value: 'user', icon: '👤' },
//      { label: 'وکیل', value: 'lowyer', icon: '⚖️' },
//      { label: 'ادمین', value: 'admin', icon: '🔐' },
//    ]

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  icon?: string
}

const props = defineProps<{
  modelValue: string | number | null
  options: SelectOption[]
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
  rtl?: boolean
  width: string
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const open = ref(false)
const search = ref('')
const highlightedIndex = ref(-1)
const root = ref<HTMLElement | null>(null)

const selectedOption = computed(() => props.options.find((o) => o.value === props.modelValue))

const selectedLabel = computed(() => selectedOption.value?.label)

const filteredOptions = computed(() => {
  if (!props.searchable || !search.value) return props.options
  return props.options.filter((o) => o.label.toLowerCase().includes(search.value.toLowerCase()))
})

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function close() {
  open.value = false
  highlightedIndex.value = -1
}

function openDropdown() {
  if (!props.disabled) open.value = true
}

function select(option: SelectOption) {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  close()
}

function selectHighlighted() {
  const option = filteredOptions.value[highlightedIndex.value]
  if (!option) return

  select(option)
}

function handleClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

watch(open, (v) => {
  if (!v) search.value = ''
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
