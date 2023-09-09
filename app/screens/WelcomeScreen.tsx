import React, { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import { HorizontalSlider, MoviePosteer } from "app/components"
import { GradientBackground } from "app/components/GradientBackground"
import { useMovies } from "app/hooks/useMovies"

import ImageColors from "react-native-image-colors"

import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Carousel from "react-native-snap-carousel"
import { getColors } from "app/helpers/getColors"


const { width: windowWidth } = Dimensions.get("window")

export const WelcomeScreen = () => {
  const navigator = useNavigation()

  const { nowPlaying, isLoading, popular, topRated, upcoming } = useMovies()
  const { top } = useSafeAreaInsets()

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index]
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const [primary, secondary] = await getColors(uri)

    console.log(primary, secondary)
  }




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
