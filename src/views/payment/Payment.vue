<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

/* ======================
   Route Context
====================== */
const route = useRoute()

const paymentType = route.query.type as string
const amount = Number(route.query.amount)
const plan = route.query.plan as string // basic | pro | vip
const userId = route.query.userId as string

/* ======================
   Form State
====================== */
const cardNumber = ref('')
const cvv = ref('')
const expire = ref('')

/* ======================
   UI State
====================== */
const loading = ref(false)
const success = ref(false)
const error = ref('')

/* ======================
   Computed
====================== */
const paymentTypeLabel = computed(() => {
  switch (paymentType) {
    case 'subscription':
      return 'پرداخت حق اشتراک'
    case 'consultation':
      return 'پرداخت مشاوره'
    default:
      return 'پرداخت خدمات'
  }
})

const formattedAmount = computed(() =>
  amount.toLocaleString('fa-IR') + ' تومان'
)

/* ======================
   Submit
====================== */
async function submitPayment() {
  loading.value = true
  error.value = ''

  try {
    await axios.post('BACKEND_PAYMENT_URL', {
      userId,
      paymentType,
      subscriptionPlan: plan,
      amount,
      currency: 'IRR',
      createdAt: new Date().toISOString()
    })

    success.value = true
  } catch (e) {
    error.value = 'خطا در ثبت پرداخت، لطفاً دوباره تلاش کنید'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">

      <!-- Title -->
      <h1 class="text-2xl font-bold mb-4 text-center">
        صفحه پرداخت
      </h1>

      <!-- Summary -->
      <div class="border rounded-xl p-4 mb-6 bg-gray-50">
        <p class="text-sm text-gray-500">نوع پرداخت</p>
        <p class="font-semibold mb-2">{{ paymentTypeLabel }}</p>

        <p class="text-sm text-gray-500">مبلغ قابل پرداخت</p>
        <p class="font-semibold">{{ formattedAmount }}</p>
      </div>

      <!-- Fake Form -->
      <form @submit.prevent="submitPayment" class="space-y-4">
        <input
          v-model="cardNumber"
          type="text"
          placeholder="شماره کارت"
          class="input"
          required
        />

        <div class="flex gap-2">
          <input
            v-model="cvv"
            type="text"
            placeholder="CVV2"
            class="input"
            required
          />
          <input
            v-model="expire"
            type="text"
            placeholder="MM/YY"
            class="input"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'در حال پردازش...' : 'پرداخت' }}
        </button>
      </form>

      <!-- Result -->
      <p v-if="success" class="mt-4 text-green-600 text-center font-semibold">
        پرداخت با موفقیت انجام شد
      </p>

      <p v-if="error" class="mt-4 text-red-600 text-center">
        {{ error }}
      </p>

    </div>
  </section>
</template>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
