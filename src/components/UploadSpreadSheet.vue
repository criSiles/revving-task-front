<template>
  <div class="upload-container">
    <input type="file" id="file" @change="handleFileUpload" style="display: none" />
    <label for="file" class="file-input-label">
      <i class="fa-solid fa-upload upload-icon"></i>
      Select a file
    </label>
    <p v-if="errorUploadFile" class="error">{{ errorUploadFile }}</p>
    <div v-if="isLoading" class="loader"></div>
    <!-- TODO: When the list shows, stay up instead of go down -->
    <div class="selection-container" v-if="response && response.length > 0">
      <div class="selection-block">
        <h2 class="title">Revenue Source</h2>
        <ul class="revenue-source-list">
          <li
            v-for="(revenue_source, index) in response"
            :key="index"
            @click="setRevenueSource(revenue_source)"
          >
            {{ revenue_source }}
          </li>
        </ul>
      </div>
      <!-- TODO: Change the date format in the backend to accept this -->
      <!-- TODO: Style calendar -->
      <!-- TODO: Style scrollbar -->
      <div class="selection-block">
        <label class="title" for="start-date">Start Date:</label>
        <input type="date" id="start-date" v-model="start_date" />
      </div>
      <div class="selection-block">
        <label class="title" for="end-date">End Date:</label>
        <input type="date" id="end-date" v-model="end_date" />
      </div>
    </div>
    <button class="submit-button" @click="onSubmit" :disabled="!isFileValid">Submit</button>
    <p v-if="submitError" class="error">{{ submitError }}</p>
    <CalculationResults
      v-if="calculationsReceived"
      :calculationResultsData="calculationResultsData"
      :selectedFields="selectedFields"
    />
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { postRawData, postCalculateValues } from '@/api/backend'
import CalculationResults from './CalculationResults.vue'

export default {
  name: 'UploadSpreadsheet',
  components: {
    CalculationResults
  },
  data() {
    return {
      jsonData: [],
      errorUploadFile: '',
      isFileValid: false,
      isLoading: false,
      response: [],
      start_date: '',
      end_date: '',
      revenue_source: null,
      submitError: '',
      calculationsReceived: false,
      calculationResultsData: {},
      selectedFields: {}
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.errorUploadFile = ''
      this.jsonData = []
      this.response = []

      if (!file) {
        this.errorUploadFile = 'No file selected, please select a file to upload'
        return
      }

      // Validate file type
      const validFileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ]
      if (!validFileTypes.includes(file.type)) {
        this.errorUploadFile = 'Invalid file type. Please upload an Excel file (.xlsx or .xls).'
        return
      }

      // Validate file size (limit: 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        this.errorUploadFile = 'File size exceeds the 5MB limit.'
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          this.jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false })
          this.isFileValid = true
          this.isLoading = true

          // Send the JSON data to the server immediately after file upload
          postRawData(this.jsonData)
            .then((responseData) => {
              console.log('Success:', responseData)
              this.response = responseData
            })
            .catch((error) => {
              console.error('Error calling postRawData:', error)
              this.errorUploadFile = 'Failed to submit data. Please try again.'
            })
            .finally(() => {
              this.isLoading = false
            })
        } catch (error) {
          this.isFileValid = false
          this.errorUploadFile =
            'Error parsing the file. Please make sure the file is a valid Excel spreadsheet.'
        }
      }

      reader.onerror = () => {
        this.errorUploadFile = 'Error reading the file.'
        this.isFileValid = false
      }

      reader.readAsArrayBuffer(file)
    },
    setRevenueSource(value) {
      this.revenue_source = value
    },
    onSubmit() {
      console.log('Submitting data:', this.start_date, this.end_date, this.revenue_source)

      // Validate data
      if (!this.start_date || !this.end_date || !this.revenue_source) {
        this.submitError = 'Please ensure all fields are filled out correctly.'
        return
      }

      // Prepare data
      this.selectedFields = {
        // Update this line
        start_date: this.start_date,
        end_date: this.end_date,
        revenue_source: this.revenue_source,
        target_currency: 'EUR'
      }

      // Send data
      this.isLoading = true
      this.calculationsReceived = false
      postCalculateValues(this.selectedFields)
        .then((response) => {
          this.response = response.data
          this.calculationResultsData = response
          console.log(this.calculationResultsData)
          // Handle success - you might want to clear the form or give user feedback
          console.log('Data submitted successfully', response)
        })
        .catch((error) => {
          // Handle error - update errorMessage or handle the error as needed
          this.submitError = 'Failed to submit data: ' + error.message
          console.error('Error submitting data', error)
        })
        .finally(() => {
          this.isLoading = false
          this.calculationsReceived = true
        })
    }
  }
}
</script>

<style>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.file-input-label {
  margin-top: 2rem;
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--bg-secondary);
  border-radius: 2px;
  color: white;
  cursor: pointer;
}

.file-input-label:hover {
  background-color: var(--text-secondary);
}

.upload-icon {
  margin-right: 0.5rem;
}

.error {
  color: rgb(250, 80, 80);
  opacity: 0.8;
  font-weight: 400;
}

.loader {
  border: 5px solid var(--text-primary);
  border-top: 5px solid var(--text-secondary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.revenue-source-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 600px;
  border: 1px solid var(--text-secondary);
  border-radius: 2px;
  cursor: pointer;
  color: var(--text-primary);
  height: 500px;
  overflow-y: scroll;
  margin-top: 1rem;
}

.revenue-source-list li {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.revenue-source-list li:last-child {
  border-bottom: none;
}

.revenue-source-list li:hover {
  background-color: var(--text-tertiary);
  color: var(--text-secondary);
}

.revenue-source-list li:active {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.selection-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-button {
  padding: 0.95rem 3.6rem;
  background-color: transparent;
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.submit-button:hover {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
}

.submit-button:disabled {
  cursor: not-allowed;
}
</style>
