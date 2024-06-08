import axios from 'axios'

// Base URL of the API
const baseURL = 'http://localhost:8080/backend'

// Headers for JSON content type
const headers = {
  'Content-Type': 'application/json'
}

// Example data for the /rawdata endpoint
// const rawdataPayload = [
//   {
//     date: '2023-05-01',
//     'invoice number': 3710.0,
//     value: 12041.95,
//     'haircut percent': 10.0,
//     'Daily fee percent': 0.125,
//     currency: 'USD',
//     'Revenue source': 'Index Playcrows',
//     customer: 'RunUp INC',
//     'Expected payment duration': 60.0
//   }
// ]
// Example data for the /totalValues endpoint
// const calculateValuesPayload = {
//   revenue_source: 'AlexUndeR',
//   startdate: '2023-01-01',
//   enddate: '2023-12-01',
//   target_currency: 'EUR'
// }

// POST request to /rawdata with the rawdataPayload as argument
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

// POST request to /calculateValues
// axios
//   .post(`${baseURL}/calculateValues`, calculateValuesPayload, { headers })
//   .then((response) => console.log('Response from /calculateValues:', response.data))
//   .catch((error) => console.error('Error:', error))

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
