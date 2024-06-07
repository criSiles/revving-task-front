<template>
  <div class="upload-container">
    <input type="file" id="file" @change="handleFileUpload" style="display: none" />
    <label for="file" class="file-input-label">
      <i class="fa-solid fa-upload upload-icon"></i>
      {{ fileName || 'Select a file' }}
    </label>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="uploadMessage" class="success">{{ uploadMessage }}</p>
    <button class="submit-button" @click="onSubmit">Submit</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'UploadSpreadsheet',
  data() {
    return {
      jsonData: [],
      errorMessage: '',
      uploadMessage: ''
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.errorMessage = ''
      this.jsonData = []

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
          this.jsonData = XLSX.utils.sheet_to_json(worksheet)
          this.uploadMessage = 'File uploaded'
        } catch (error) {
          this.errorMessage =
            'Error parsing the file. Please make sure the file is a valid Excel spreadsheet.'
        }
      }

      reader.onerror = () => {
        this.errorMessage = 'Error reading the file.'
      }

      reader.readAsArrayBuffer(file)
    },
    onSubmit() {
      // Here I'll write the code to send the jsonData to the server
      console.log(this.jsonData)
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

.submit-button {
  padding: 0.95rem 3.8rem;
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

.upload-icon {
  margin-right: 0.5rem;
}
.error {
  color: var(--bg-secondary);
  opacity: 0.8;
  font-weight: 500;
}

.success {
  color: var(--text-tertiary);
  opacity: 0.8;
  font-weight: 500;
}
</style>