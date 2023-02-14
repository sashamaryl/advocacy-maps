import { app } from "components/firebase"

import { FirebaseDataProvider } from "react-admin-firebase"

import { createContext, useContext, useEffect, useState } from "react"
import { Admin, DataProvider } from "react-admin"


export const App = () => {
  const [hasWindow, setHasWindow] = useState<boolean>(false)
  const [dataProvider, setDataProvider] = useState<DataProvider>()
  console.log(hasWindow)
  useEffect(() => {
    if (!hasWindow && window) {
      setHasWindow(!!window)
      const myDataProvider = FirebaseDataProvider(app.options)
      if (myDataProvider) setDataProvider(myDataProvider)
    }
  }, [hasWindow])

  console.log(dataProvider)

  return (
    <>
      {" "}
      {hasWindow && dataProvider && <Admin dataProvider={dataProvider}></Admin>}
    </>
  )
}
/*
form where they can approve a thing
table where they can view the things
tag with date, reviewer, etc
allow comments
*/

export default App
