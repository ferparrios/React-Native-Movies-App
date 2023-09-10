import React, { useContext, useEffect } from "react"

import { HorizontalSlider, MoviePosteer } from "app/components"
import { GradientBackground } from "app/components/GradientBackground"
import { useMovies } from "app/hooks/useMovies"

import { ActivityIndicator, View, Dimensions, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Carousel from "react-native-snap-carousel"
import { getColors } from "app/helpers/getColors"
import { GradientContext } from "app/context/GradientContext"

const { width: windowWidth } = Dimensions.get("window")

export const WelcomeScreen = () => {
  const { nowPlaying, isLoading, popular, topRated, upcoming } = useMovies()
  const { top } = useSafeAreaInsets()
  const { setMainColors } = useContext(GradientContext)

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index]
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const [primary = "green", secondary = "orange"] = await getColors(uri)
    setMainColors({ primary, secondary })
  }

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0)
    }
  }, [nowPlaying])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"red"} size={100} />
      </View>
    )
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View
          style={{
            marginTop: top + 20,
          }}
        >
          <View
            style={{
              height: 440,
            }}
          >
            <Carousel
              data={nowPlaying}
              renderItem={({ item }: any) => <MoviePosteer movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index) => getPosterColors(index)}
            />
          </View>
          {/* Peliculas populares */}
          <HorizontalSlider movies={popular} title="Popular" />
          <HorizontalSlider movies={topRated} title="Top Rated" />
          <HorizontalSlider movies={upcoming} title="Upcoming" />
        </View>
      </ScrollView>
    </GradientBackground>
  )
}
