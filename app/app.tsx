import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setupReactotron } from "./services/reactotron"
import Config from "./config"

setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

// export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// const prefix = Linking.createURL("/")
// const config = {
//   screens: {
//     Login: {
//       path: "",
//     },
//     Welcome: "welcome",
//     Demo: {
//       screens: {
//         DemoShowroom: {
//           path: "showroom/:queryIndex?/:itemIndex?",
//         },
//         DemoDebug: "debug",
//         DemoPodcastList: "podcast",
//         DemoCommunity: "community",
//       },
//     },
//   },
// }

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

function App(props: AppProps) {
  const { hideSplashScreen } = props
  // const {
  //   initialNavigationState,
  //   onNavigationStateChange,
  //   isRestored: isNavigationStateRestored,
  // } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 500)
  })

  // if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  // const linking = {
  //   prefixes: [prefix],
  //   config,
  // }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppNavigator
          // linking={linking}
          // initialState={initialNavigationState}
          // onStateChange={onNavigationStateChange}
        />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
