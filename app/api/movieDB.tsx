import axios from "axios"

const movieDB = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  params: {
    api_key: "05c160ecec6a875f50117971b5bcca00",
    language: "es-ES",
  },
})

export default movieDB
