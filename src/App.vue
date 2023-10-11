<script setup>
import { computed } from 'vue'
import TextInput from './components/TextInput.vue'

const textboxStyle = computed(() => {
  return {
    padding: '1px'
  }
})
</script>

<template>
  <header>
  </header>

  <main class="text-sm">
    <div>
      Basic textbox
      <input type="text" class="placeholder-gray-700 rounded-none focus:outline-none" placeholder="some placeholder text"
        :style="textboxStyle">
    </div>

    <div class="border border-green-500">
      Custom textbox
      <TextInput />
    </div>
  </main>
</template>

