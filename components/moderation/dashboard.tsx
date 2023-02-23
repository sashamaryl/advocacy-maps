import { Card } from "components/Card"
import {
  Button,
  Datagrid, ListContextProvider,
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
  return (
    <div className="h-75">
      <div className="d-flex">
        <DisplayFlagList />
        <ShowTotal />
      </div>
    </div>
  )
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
