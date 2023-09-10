import React from "react"
import "./i18n"
import "./utils/ignoreWarnings"
import { AppNavigator, useNavigationPersistence } from "./navigators"

import { setupReactotron } from "./services/reactotron"

import { GradientProvider } from "./context/GradientContext"

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

const AppState = ({ children }: any) => {
  return <GradientProvider>{children}</GradientProvider>
}

const App = () => {
  return (
    <AppState>
      <AppNavigator />
    </AppState>
  )
}

export default App
