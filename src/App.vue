<script setup>
import { computed } from 'vue'

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

    <div>
      Custom textbox

    </div>
  </main>
</template>

