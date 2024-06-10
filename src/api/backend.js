import axios from 'axios'

// Base URL of the API
const baseURL = 'http://localhost:8080/backend'

// Headers for JSON content type
const headers = {
  'Content-Type': 'application/json'
}

// POST request to /rawdata/ with the rawdataPayload as argument
async function postRawData(rawdataPayload) {
  if (!rawdataPayload) {
    throw new Error('Payload is empty or undefined.')
  }

  try {
    const response = await axios.post(`${baseURL}/rawdata/`, rawdataPayload, { headers })
    return response.data
  } catch (error) {
    // Log or handle error as needed
    console.error('Error posting raw data:', error)
    throw error // Rethrow or handle as needed
  }
}

// POST request to /calculateValues/ with the valuesPayload as argument
async function postCalculateValues(valuesPayload) {
  if (!valuesPayload) {
    throw new Error('Payload is empty or undefined.')
  }

  try {
    const response = await axios.post(`${baseURL}/calculateValues/`, valuesPayload, { headers })
    return response.data
  } catch (error) {
    console.error('Error posting calculated values:', error)
    throw error
  }
}
export { postRawData, postCalculateValues }
