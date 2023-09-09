import movieDB from "app/api/movieDB"
import { MovieDBResponse, Movie } from "app/interfaces/movieinterface"
import React, { useEffect, useState } from "react"

interface MoviesState {
  nowPlaying: Movie[]
  popular: Movie[]
  topRated: Movie[]
  upcoming: Movie[]
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true)
  // const [peliculasEnCine, setPeliculasEnCine] = useState<Movie[]>([])
  // const [peliculasPopulares, setPeliculasPopulares] = useState<Movie[]>([])
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  })

  const getMOvies = async () => {
    const nowPlayingPromise = await movieDB.get<MovieDBResponse>("/now_playing")
    const popularPromise = await movieDB.get<MovieDBResponse>("/popular")
    const topRatedPromise = await movieDB.get<MovieDBResponse>("/top_rated")
    const upcomingPromise = await movieDB.get<MovieDBResponse>("/upcoming")

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ])

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results,
    })

    setIsLoading(false)
  }

  useEffect(() => {
    //Now_playing
    getMOvies()
  }, [])

  return {
    ...moviesState,
    isLoading,
  }
}
