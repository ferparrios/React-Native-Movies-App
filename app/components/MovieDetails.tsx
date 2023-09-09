import { Cast } from "app/interfaces/creditsInterface"
import { MovieFull } from "app/interfaces/movieinterface"
import React from "react"
import { FlatList, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import currencyFormatter from "currency-formatter"
import { CastItems } from "."

interface Props {
  movieFull: MovieFull
  cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="star-outline" color={"grey"} size={15} />
          <Text>{movieFull.vote_average}</Text>
          <Text style={{ marginLeft: 5 }}>- {movieFull.genres.map((g) => g.name).join(",")}</Text>
        </View>
      </View>

      {/* Historia */}
      <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold" }}>Historia</Text>

      <Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>

      <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold" }}>Presupuesto</Text>

      <Text style={{ fontSize: 16 }}>
        {currencyFormatter.format(movieFull.budget, { code: "USD" })}
      </Text>

      {/* Casting */}
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold", marginHorizontal: 20 }}>
          Reparto
        </Text>

        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CastItems actor={item} />}
          horizontal
          showsHorizontalScrollIndicator
          style={{marginTop: 10, height: 60}}
        />
      </View>
    </>
  )
}
