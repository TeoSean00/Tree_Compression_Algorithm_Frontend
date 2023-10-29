import axios from "axios"

const baseURL = "http://localhost:8080"

const getBackendCheck = async (algorithm1, algorithm2) => {
  const response = await axios.get(
    `${baseURL}/healthcheck?algo1=${algorithm1}&algo2=${algorithm2}`,
  )

  return response
}

const getAlgorithms = async (algorithm1, algorithm2) => {
  const response = await axios.get(
    `${baseURL}/algorithms?algo1=${algorithm1}&algo2=${algorithm2}`,
  )

  return response
}

export default {
  getBackendCheck,
  getAlgorithms,
}