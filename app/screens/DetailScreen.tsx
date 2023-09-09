import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { Movie } from "app/interfaces/movieinterface"
import { AppStackParamList } from "app/navigators"
import Icon from "react-native-vector-icons/Ionicons"
import { useMovieDetails } from "app/hooks/useMovieDetails"
import { MovieDetails } from "app/components"

interface Props extends NativeStackScreenProps<AppStackParamList, "Detail"> {}

const screenHeight = Dimensions.get("screen").height

export const DetailScreen = ({ route }: Props) => {
  const movie = route.params
  console.log(movie.original_title)
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  console.log(movie.id)
  const navigator = useNavigation()

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id)

  return (
    <ScrollView>
      <View style={styles.imageBorder}>
        <View style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={35} color={"grey"} style={{ marginTop: 20 }} />
      ) : (
        <MovieDetails movieFull={movieFull} cast={cast} />
      )}

      <TouchableOpacity onPress={() => navigator.goBack()} style={styles.backButton}>
        <Icon color={"white"} name="arrow-back-outline" size={60}  />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  imageBorder: {
    flex: 1,
    overflow: "hidden",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  },
})
