<template>
  <section id="calculation-section">
    <h2 class="title">Calculation</h2>
    <span class="subtitle">Quick and easy way to calculate your monthly expectations</span>
    <div class="commun-container">
      <img class="commun-icon" src="/src/assets/finance-solution-icon.svg" />
      <h3 class="instruction-heading">Upload your spreadsheet</h3>
      <p class="description">First, upload your spreadsheet to get started with the calculation</p>
      <UploadSpreadSheet @updateRevenueSourceList="handleRevenueSourceListUpdate" />
    </div>
    <SelectionComponent
      v-if="revenue_source_list.length > 0"
      :revenue_source_list="revenue_source_list"
    />
  </section>
</template>

<script>
import UploadSpreadSheet from './UploadSpreadSheet.vue'
import SelectionComponent from './SelectionComponent.vue'

export default {
  name: 'CalculationComponent',
  data() {
    return {
      revenue_source_list: []
    }
  },
  components: {
    UploadSpreadSheet,
    SelectionComponent
  },
  methods: {
    handleRevenueSourceListUpdate(revenue_source_list) {
      console.log('Revenue source list updated:', revenue_source_list)
      this.revenue_source_list = revenue_source_list
    }
  }
}
</script>

<style>
#calculation-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
</style>
