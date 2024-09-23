<script setup>
import { useMousePosition } from '@/hooks'
window.addEventListener('keyup', (e) => {
  console.log(e)
})

const position = useMousePosition()
</script>
<template>
  <div class="find">Find-发现{{ position }}</div>
</template>
