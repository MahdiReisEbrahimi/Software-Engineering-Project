<template>
  <div
    v-if="props.newClick"
    class="slow-comming-Down-animation bg-white shadow-lg w-9/10 mx-2 max-w-full font-sans text-gray-800"
  >
    <div class="flex py-4">
      <NextLastBtn direction="right" />
      <div class="shadow-xl/30">
        <div class="mx-3 py-5 flex justify-between">
          <div>
            <div class="flex flex-col items-center mb-4">
              <h2 class="text-xl font-bold">{{ props.lowyerInfo.name }}</h2>
            </div>

            <ul class="text-right list-disc list-inside mb-4 space-y-1 text-sm">
              <li v-for="(service, indx) in props.lowyerInfo.services" :key="indx">
                {{ service }}
              </li>
            </ul>

            <p class="text-center text-gray-600 text-sm">
              {{ `بیش از ${props.lowyerInfo.experience} سال سابقه` }}
            </p>
          </div>
          <div>
            <img
              :src="'/assets/img/' + props.lowyerInfo.imgLink"
              alt="lawyerPic"
              class="w-20 h-20 rounded-full mb-2 border-2 border-blue-400"
            />
            <div class="flex items-center mt-1">
              <span class="text-yellow-400">★★★★☆</span>
              <span class="text-gray-500 text-sm ml-2">{{
                `${props.lowyerInfo.reviews.length} نظر`
              }}</span>
            </div>
          </div>
        </div>
        <button
          class="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
        >
          ثبت درخواست مشاوره
        </button>
      </div>
      <NextLastBtn direction="left" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NextLastBtn from '@/components/reusable/NextLastBtn.vue'
import type { LowyerInfoType } from '@/Types/User'

const props = defineProps<{
  lowyerInfo: LowyerInfoType
  newClick: boolean
}>()
</script>
