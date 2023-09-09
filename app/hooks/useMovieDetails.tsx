import movieDB from "app/api/movieDB"
import { CreditsResponse } from "app/interfaces/creditsInterface"
import { MovieFull } from "app/interfaces/movieinterface"
import { useEffect, useState } from "react"

interface MovieDetails {
  cast: any[]
  isLoading: boolean
  movieFull: MovieFull
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  })

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`)
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`)

    const [movieDetailsResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ])
    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast,
    })
  }
  useEffect(() => {
    getMovieDetails()
  }, [])
  return {
    ...state,
  }
}
