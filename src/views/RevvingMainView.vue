<template>
  <div class="container">
    <RevvingHeader />
    <div class="content">
      <CalculationComponent />
    </div>
    <RevvingFooter />
  </div>
</template>

<script setup>
import RevvingHeader from '../components/RevvingHeader.vue'
import CalculationComponent from '../components/CalculationComponent.vue'
import RevvingFooter from '@/components/RevvingFooter.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
