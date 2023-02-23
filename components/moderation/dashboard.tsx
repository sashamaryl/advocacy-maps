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
  queryCollectionSingle("publishedTestimony")
  queryCollectionGroup("publishedTestimony")

  return (
    <div className="h-75">
      <DisplayOtherList mylist="publishedTestimony" />
    </div>
  )
}

import {
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore"
import { firestore } from "components/firebase"
import { Testimony } from "components/db"
import { Committee } from "functions/src/committees/types"
import { SetStateAction, useEffect, useState } from "react"

async function queryCollectionGroup(test: string) {
  const myquery = query(collectionGroup(firestore, test))
  const querySnapshot = await getDocs(myquery)
  console.log("collectionGroupQuery", querySnapshot.size)
  return querySnapshot
}

async function queryCollectionSingle(test: string) {
  const testCollection = collection(firestore, test)
  const snap = await getDocs(testCollection)
  console.log("collectionSingle", snap.size)
}

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

function DisplayOtherList({ mylist }: { mylist: string }) {
  // const {data, total, isLoading } = use
  // const { data, total, isLoading } = useGetList<any>(mylist, {
  //   filter: {},
  //   sort: { field: "date", order: "DESC" },
  //   pagination: { page: 1, perPage: 50 }
  // })

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<RaRecord[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (data.length > 0) return
    const snap: Promise<QuerySnapshot<DocumentData>> =
      queryCollectionGroup(mylist)
    const d: RaRecord[] = []
    snap
      .then(docs =>
        docs.forEach(doc => {
          const docRecord = doc.data() as RaRecord
          d.push(docRecord)
        })
      )
      .then(_ => {
        setData(d as SetStateAction<RaRecord[]>)
        !isLoading && setIsLoading(false)
        setTotal(data.length)
      })
  })

  const listContext = useList({ data, isLoading })

  const recordKeys = Object.keys(data.length > 0 && data[0])

  console.log(recordKeys)

  return (
    <ResourceContextProvider value="mylist">
      <ListContextProvider value={listContext}>
        <Datagrid
          data={data}
          total={total}
          isLoading={isLoading}
          sort={{ field: "date", order: "DESC" }}
        >
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
