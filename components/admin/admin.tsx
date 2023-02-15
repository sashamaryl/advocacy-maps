import { app } from "components/firebase"

import { FirebaseDataProvider } from "react-admin-firebase"
import {
  Admin,
  AdminContext,
  AdminUI,
  ListGuesser,
  Resource,
  defaultI18nProvider,
  localStorageStore
} from "react-admin"
import Router from "next/router"
import { createService } from "components/service"

const useFirebaseProvider = () => {
  const dataProvider = FirebaseDataProvider(app.options)
  return dataProvider
}
import { useDataProvider } from "react-admin"
import { useEffect, useState } from "react"

export const App = () => {
  const { Provider, useServiceChecked } = createService(useFirebaseProvider)

  const dataProvider = FirebaseDataProvider(app.options)

  return (
    <Provider>
      {/* <Admin> */}
      <AdminContext
        dataProvider={dataProvider}
        i18nProvider={defaultI18nProvider}
        store={localStorageStore()}
      >
        <AdminUI>
          {/* <Resource name="events" list={ListGuesser} />{" "} */}
          <Resources />
        </AdminUI>
      </AdminContext>
      {/* </Admin> */}
    </Provider>
  )
}

const Resources = () => {
  const [resources, setResources] = useState([])
  const dataProvider = useDataProvider()
  useEffect(() => {
    /**@ts-ignore */
    dataProvider.introspect().then(r => setResources(r))
  }, [dataProvider])

  return (
    <AdminUI>
      {resources.map(resource => (
    /**@ts-ignore */
        <Resource name={resource.name} key={resource.key} list={ListGuesser} />
      ))}
    </AdminUI>
  )
}
/*
form where they can approve a thing
table where they can view the things
tag with date, reviewer, etc
allow comments
*/

export default App
