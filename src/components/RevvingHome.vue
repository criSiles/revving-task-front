<template>
  <section id="calculation-section">
    <h2 class="title">
      Calculation
      <span class="subtitle">Quick and easy way to calculate your monthly expectations</span>
    </h2>
    <div class="calculation-container">
      <img class="calculation-icon" src="/src/assets/palm-coin-icon.svg" />
      <h3 class="instruction-heading">Upload your spreadsheet</h3>
      <p class="description">
        Upload your spreadsheet to get started. We will calculate your monthly expectations based on
        the data you provide.
        <UploadSpreadSheet />
      </p>
    </div>
  </section>
</template>

<script setup>
import UploadSpreadSheet from '../components/UploadSpreadSheet.vue'
</script>

<style scoped>
#calculation-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
}

.calculation-container {
  margin-top: 2rem;
  width: 100%;
  box-shadow: rgb(0, 0, 0) 4px 4px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url(/src/assets/bgBox.svg) 0% 0% / cover no-repeat rgb(33, 33, 33);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(154, 161, 248, 0.5);
  border-image: initial;
  border-radius: 8px;
  padding: 2rem;
}

.calculation-icon {
  width: 60px;
  aspect-ratio: auto 60 / 64;
  height: 64px;
  margin-bottom: 1rem;
}
</style>
