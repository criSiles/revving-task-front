<template>
  <div class="commun-container selection-container">
    <img class="commun-icon" src="/src/assets/palm-coin-icon.svg" />
    <h3 class="instruction-heading">Fill all the fields</h3>
    <p class="description">
      Then, fill all the necessary data to calculate your monthly expectations
    </p>
    <div class="selection-block">
      <label class="instruction-heading" for="revenue_source">Revenue Source</label>
      <select v-model="revenue_source" @change="updateParent" class="selection-style">
        <option disabled value="">{{ 'Select a revenue source' }}</option>
        <option
          v-for="(revenue_source, index) in revenue_source_list"
          :key="index"
          :value="revenue_source"
        >
          {{ revenue_source }}
        </option>
      </select>
    </div>
    <div class="selection-block">
      <label class="instruction-heading" for="start-date">From</label>
      <input type="date" id="start-date" v-model="start_date" @change="updateParent" />
    </div>
    <div class="selection-block">
      <label class="instruction-heading" for="end-date">To</label>
      <input type="date" id="end-date" v-model="end_date" @change="updateParent" />
    </div>
    <div class="selection-block">
      <label class="instruction-heading" for="currency">Currency</label>
      <select id="currency" v-model="target_currency" @change="updateParent">
        <option disabled value="">{{ 'Select' }}</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
    <button class="submit-button" @click="onSubmit" :disabled="revenue_source_list.length === 0">
      Submit
    </button>
    <p v-if="submitError" class="error">{{ submitError }}</p>
    <div v-if="isLoading" class="loader"></div>
  </div>
  <CalculationResults
    v-if="calculationReceived"
    :calculationResultsData="responseCalculation"
    :revenue_source="revenue_source"
    :target_currency="target_currency"
  />
</template>

<script>
import { postCalculateValues } from '@/api/backend'
import CalculationResults from './CalculationResults.vue'

export default {
  name: 'SelectionComponent',
  props: ['revenue_source_list'],
  data() {
    return {
      start_date: '',
      end_date: '',
      revenue_source: '',
      target_currency: '',
      submitError: '',
      isLoading: false,
      calculationReceived: false,
      responseCalculation: {}
    }
  },
  components: {
    CalculationResults
  },
  methods: {
    onSubmit() {
      console.log('Submitting data:', this.start_date, this.end_date, this.revenue_source)

      if (!this.start_date || !this.end_date || !this.revenue_source) {
        this.submitError = 'Please ensure all fields are filled out correctly'
        return
      }

      this.isLoading = true
      this.calculationReceived = false
      postCalculateValues({
        start_date: this.start_date,
        end_date: this.end_date,
        revenue_source: this.revenue_source,
        target_currency: this.target_currency
      })
        .then((response) => {
          if (!response) {
            this.submitError = 'No response from server'
            return
          }

          // Check if response has required properties
          const requiredProperties = ['total_value', 'advance_value', 'total_fees']
          const missingProperties = requiredProperties.filter(
            (prop) => response[prop] === undefined
          )
          if (missingProperties.length > 0) {
            console.error('Missing properties in response:', missingProperties.join(', '))
            return false
          }

          this.responseCalculation = response
        })
        .catch((error) => {
          this.submitError = 'Failed to submit data: ' + error.message
          console.error('Error submitting data', error)
        })
        .finally(() => {
          this.isLoading = false
          this.calculationReceived = true
        })
    }
  }
}
</script>

<style scoped>
.selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 2rem 1rem;
}

.selection-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.selection-style,
.selection-block select,
.selection-block input[type='date'] {
  width: 100%;
  height: 35px;
}

.submit-button {
  padding: 0.95rem 3.6rem;
  margin-top: 1rem;
  color: var(--text-primary);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  background-color: var(--bg-secondary);
  font-size: 1rem;
}

.submit-button:hover {
  background-color: var(--text-secondary);
}

.submit-button:disabled {
  cursor: not-allowed;
}
</style>
