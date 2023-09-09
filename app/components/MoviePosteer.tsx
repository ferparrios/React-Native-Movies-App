import { useNavigation } from "@react-navigation/native"
import { Movie } from "app/interfaces/movieinterface"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Props {
  movie: Movie
  height?: number
  width?: number
}

export const MoviePosteer = ({ movie, height = 400, width = 300 }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", movie)}
      activeOpacity={0.8}
      style={{
        width,
        height,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7
      }}
    >
      <View style={styles.imageContainer}></View>
      <Image
        source={{
          uri,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
