<template>
  <div class="upload-container">
    <input type="file" id="file" @change="handleFileUpload" style="display: none" />
    <label for="file" class="file-input-label">
      <i class="fa-solid fa-upload upload-icon"></i>
      Select a file
    </label>
    <p v-if="errorUploadFile" class="error">{{ errorUploadFile }}</p>
    <div v-if="isLoading" class="loader"></div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { postRawData } from '@/api/backend'

export default {
  name: 'UploadSpreadsheet',
  components: {},
  data() {
    return {
      jsonData: [],
      errorUploadFile: '',
      isFileValid: false,
      isLoading: false
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.errorUploadFile = ''
      this.jsonData = []
      this.revenue_source_list = []

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
        this.errorUploadFile = 'Invalid file type, please upload an Excel file (.xlsx or .xls)'
        return
      }

      // Validate file size (limit: 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        this.errorUploadFile = 'File size exceeds the 5MB limit'
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
              this.$emit('updateRevenueSourceList', responseData)
            })
            .catch((error) => {
              console.error('Error calling postRawData:', error)
              this.errorUploadFile = 'Failed to submit data, please try again'
            })
            .finally(() => {
              this.isLoading = false
            })
        } catch (error) {
          this.isFileValid = false
          this.errorUploadFile =
            'Error parsing the file, please make sure the file is a valid Excel spreadsheet'
        }
      }

      reader.onerror = () => {
        this.errorUploadFile = 'Error reading the file'
        this.isFileValid = false
      }

      reader.readAsArrayBuffer(file)
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
  color: var(--text-primary);
  cursor: pointer;
}

.file-input-label:hover {
  background-color: var(--text-secondary);
}

.upload-icon {
  margin-right: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
