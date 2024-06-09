<template>
  <div class="upload-container">
    <input type="file" id="file" @change="handleFileUpload" style="display: none" />
    <label for="file" class="file-input-label">
      <i class="fa-solid fa-upload upload-icon"></i>
      {{ fileName || 'Select a file' }}
    </label>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="isLoading" class="loader"></div>
    <ul class="revenue-source-list" v-if="response && response.length > 0">
      <li v-for="(revenue_source, index) in response" :key="index">{{ revenue_source }}</li>
    </ul>
    <button class="submit-button" @click="onSubmit" :disabled="!isFileValid">Submit</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { postRawData } from '@/api/backend'

export default {
  name: 'UploadSpreadsheet',
  data() {
    return {
      jsonData: [],
      errorMessage: '',
      isFileValid: false,
      isLoading: false,
      response: []
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.errorMessage = ''
      this.jsonData = []
      this.response = []

      if (!file) {
        this.errorMessage = 'No file selected, please select a file to upload'
        return
      }

      // Validate file type
      const validFileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ]
      if (!validFileTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file type. Please upload an Excel file (.xlsx or .xls).'
        return
      }

      // Validate file size (limit: 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        this.errorMessage = 'File size exceeds the 5MB limit.'
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
              this.errorMessage = 'Failed to submit data. Please try again.'
            })
            .finally(() => {
              this.isLoading = false
            })
        } catch (error) {
          this.isFileValid = false
          this.errorMessage =
            'Error parsing the file. Please make sure the file is a valid Excel spreadsheet.'
        }
      }

      reader.onerror = () => {
        this.errorMessage = 'Error reading the file.'
        this.isFileValid = false
      }

      reader.readAsArrayBuffer(file)
    }
    // onSubmit() {
    //   if (!this.isFileValid) {
    //     this.errorMessage = 'Please upload a valid spreadsheet before submitting.'
    //     return
    //   }

    //   // Send the JSON data to the server
    //   postRawData(this.jsonData)
    //     .then((responseData) => {
    //       console.log('Success:', responseData)
    //     })
    //     .catch((error) => {
    //       console.error('Error calling postRawData:', error)
    //     })
    // }
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
  color: var(--bg-secondary);
  opacity: 0.8;
  font-weight: 500;
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

.submit-button {
  padding: 0.95rem 3.6rem;
  background-color: transparent;
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
}

.submit-button:disabled {
  cursor: not-allowed;
}
</style>
