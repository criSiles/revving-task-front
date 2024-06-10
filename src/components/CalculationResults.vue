<template>
  <div class="commun-container">
    <img class="commun-icon" src="/src/assets/multicurrency-icon.svg" />
    <h3 class="instruction-heading">Check the results</h3>
    <p class="description">
      Finally, look at the results of the calculation based on the data you provided
    </p>
    <table class="calculation-table">
      <tbody>
        <tr>
          <td>Total income expected from {{ revenue_source }}</td>
          <td>{{ calculationResultsData.total_value }} {{ target_currency }}</td>
        </tr>
        <tr>
          <td>Advanced loan you'll receive</td>
          <td>{{ calculationResultsData.advance_value }} {{ target_currency }}</td>
        </tr>
        <tr>
          <td>Revving fees for the loan</td>
          <td>{{ calculationResultsData.total_fees }} {{ target_currency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  calculationResultsData: Object,
  revenue_source: String,
  target_currency: String
})
console.log(props.selectedFields)
</script>

<style scoped>
.calculation-table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
  cursor: pointer;
  color: var(--text-primary);
}

.calculation-table td {
  border: 1px solid var(--text-secondary);
  padding: 8px;
}

.calculation-table tr:hover {
  color: var(--text-primary);
  background-color: var(--text-secondary);
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
