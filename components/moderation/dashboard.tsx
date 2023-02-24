import { Card } from "components/Card"
import {
  Button,
  Datagrid,
  ListContextProvider,
  RaRecord,
  ResourceContextProvider,
  ShowButton,
  TextField,
  useGetList,
  useGetMany,
  useList
} from "react-admin"
import { loadFlags } from "./flags_dummy_data"
import { Flag } from "./types"

const Dashboard = () => {
  const mySingleCollection = queryCollectionSingle("users")
  const myGroupCollection = queryCollectionGroup("profile")

  return (
    <div className="d-flex flex-row h-75">
      <Button onClick={loadFlags}>
        <>load flags</>
      </Button>
      <DisplayOtherList mylist="publishedTestimony" />
    </div>
  )
}

import { useEffect, useState } from "react"
import { RecordType } from "zod"
import { queryCollectionSingle, queryCollectionGroup, getMyListGroup } from "./dataProviderDbCalls"

function ShowTotal() {
  const { data, isLoading } = useGetMany<Flag>("flags")
  if (isLoading) return <div>totals loading</div>
  const total = data?.length
  const resolved = data?.filter(d => d.resolved === true).length
  return (
    <Card
      className="p-5 m-5"
      body={
        <div className="d-flex flex-column">
          <div className="">total flags: {total}</div>
          <div>total resolved: {resolved}</div>
          <Button className="mt-5" onClick={loadFlags} variant="outlined">
            <>fake a flag</>
          </Button>
        </div>
      }
    />
  )
}

export function DisplayOtherList({ mylist }: { mylist: string }) {
  // const { data, total, isLoading } = useGetList<any>(mylist, {
  //   filter: {},
  //   sort: { field: "date", order: "DESC" },
  //   pagination: { page: 1, perPage: 50 }
  // })

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<RaRecord[]>([])
  const [total, setTotal] = useState(0)
  const [list, setMyList] = useState<RaRecord[]>([])

  // useEffect(() => {
  //   console.log("usingEffect", mylist)
  //   const snap = queryCollectionGroup(mylist)
  //   const d: RaRecord[] = []
  //   snap
  //     .then(docs =>
  //       docs.forEach(doc => {
  //         const docRecord = doc.data() as RaRecord
  //         d.push(docRecord)
  //       })
  //     )
  //     .then(_ => {
  //       setData(d)
  //       setIsLoading(false)
  //       setTotal(d.length)
  //     })
  // }, [mylist])

  useEffect(() => {
    const listPromise = getMyListGroup(mylist)
    listPromise.then(l => {
      setData(l.data)
      setIsLoading(false)
      setTotal(l.data.length)
    })
  }, [mylist])

  const listContext = useList({ data, isLoading })

  return (
    <ResourceContextProvider value="mylist">
      <ListContextProvider value={listContext}>
        <Datagrid
          data={data}
          total={total}
          isLoading={isLoading}
          sort={{ field: "date", order: "DESC" }}
        >
          <TextField source="id" />
          <TextField source="authorUid" />
          <TextField source="content" />
        </Datagrid>
      </ListContextProvider>
    </ResourceContextProvider>
  )
}

function DisplayFlagList() {
  const { data, total, isLoading } = useGetList<Flag>("flags", {
    filter: {},
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 50 }
  })

  const listContext = useList({ data, isLoading })

  return (
    <div className="w-50">
      <ResourceContextProvider value={"flags"}>
        <ListContextProvider value={listContext}>
          <Datagrid
            data={data}
            total={total}
            isLoading={isLoading}
            sort={{ field: "date", order: "DESC" }}
          >
            <TextField source="id" />
            <TextField source="status" />
            <TextField source="removed" />
            <ShowButton />
          </Datagrid>
        </ListContextProvider>
      </ResourceContextProvider>
    </div>
  )
}

export default Dashboard
