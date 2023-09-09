import { Movie } from "app/interfaces/movieinterface"
import React from "react"
import { View, Text, FlatList } from "react-native"
import { MoviePosteer } from "."

interface Props {
  title?: string
  movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    <View
      style={{
        height: title ? 260 : 220,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }: any) => <MoviePosteer movie={item} height={200} width={140} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
