import React, { useRef } from "react"
import { Animated, Button, View } from "react-native"

import { useFade } from "app/hooks/useFade"

export const FadeScreen = () => {
  const { fadeIn, fadeout, opacity } = useFade()

  return (
    <View
      style={{ flex: 1, backgroundColor: "gray", justifyContent: "center", alignItems: "center" }}
    >
      <Animated.View
        style={{
          backgroundColor: "#084F6A",
          width: 150,
          height: 150,
          borderColor: "white",
          borderWidth: 10,
          marginBottom: 10,
          opacity: opacity,
        }}
      ></Animated.View>
      <Button title="fadein" onPress={fadeIn} />
      <Button title="fadeout" onPress={fadeout} />
    </View>
  )
}
