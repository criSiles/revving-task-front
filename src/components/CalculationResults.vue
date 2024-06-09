<template>
  <section id="calculation-results">
    <div class="calculation-container">
      <h2 class="title">Results</h2>
      <div class="calculation-details">
        <p class="calculation-text">
          Total income expected from {{ selectedFields.revenue_source }}:
        </p>
        <p class="results">
          {{ calculationResultsData.total_value }} {{ selectedFields.target_currency }}
        </p>
      </div>
      <div class="calculation-details">
        <p class="calculation-text">Advanced money Revving can lend:</p>
        <p class="results">
          {{ calculationResultsData.advance_value }} {{ selectedFields.target_currency }}
        </p>
      </div>
      <div class="calculation-details">
        <p class="calculation-text">Revving fees for the loan:</p>
        <p class="results">
          {{ calculationResultsData.total_fees }} {{ selectedFields.target_currency }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

// Define props to receive data
const props = defineProps({
  calculationResultsData: Object,
  selectedFields: Object
})
console.log(props.selectedFields)
</script>

<style scoped>
/* TODO: Improve the design */
#calculation-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.calculation-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%; /* adjust as needed */
  margin-top: 2rem;
}
.calculation-text {
  color: var(--text-tertiary);
  font-size: 1rem;
  padding: 0 1rem;
  font-weight: 500;
  opacity: 0.8;
}
.results {
  margin-left: 6rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
}

.results:hover {
  color: var(--text-secondary);
  cursor: pointer;
}

@media (max-width: 800px) {
  .calculation-details {
    flex-direction: column;
    align-items: center;
  }
  .results {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
