<template>
  <div
    class="h-3/4 w-3/4 m-auto p-4 mt-16 items-center rounded-xl bg-gradient-to-b from-blue-50 to-blue-300"
  >
    <div class="p-2 mx-auto my-4 w-8 rounded-xl shadow-lg bg-white">
      <ChSignIn />
    </div>
    <div>
      <h2 class="font-bold text-center text-xl">Sign in with email</h2>
      <p class="text-sm mt-3 text-center">Make us a new Loyal lowyer for you!</p>
    </div>
    <div class="mx-auto text-center">
      <ReusableInput input-type="password" place-holder="Email" prefix-icon="MdRoundEmail"/>
      <input type="password" placeholder="Password">
    </div>
  </div>
</template>

<script setup lang="ts">
import ReusableInput from '../../components/reusable/ReusableInput.vue';
import { ChSignIn } from '@kalimahapps/vue-icons'
</script>
