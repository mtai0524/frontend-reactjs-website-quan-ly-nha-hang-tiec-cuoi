import axios from 'axios'

// const SERVER_CONTEXT = "/WeatherForecast";

export const endpoint = {
    // "users" : `${SERVER_CONTEXT}/api/users`
    "menu": "api/menu",
    "hall": "api/hall"
}
export default axios.create({
    baseURL: "https://localhost:7296"
})