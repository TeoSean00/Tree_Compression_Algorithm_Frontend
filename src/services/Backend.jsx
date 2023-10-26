import axios from "axios"

const baseURL = "http://localhost:8080"

const getBackendCheck = async () => {
  const response = await axios.get(
    `${baseURL}/healthcheck`,
  )

  return response
}

export default {
  getBackendCheck
}