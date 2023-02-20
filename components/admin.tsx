import { Box } from "@material-ui/core"
import { Card } from "components/bootstrap"
import { app } from "components/firebase"
import {
  Admin,
  BooleanField, Datagrid,
  DateField,
  Edit,
  Form,
  Labeled,
  List,
  Resource,
  TextField,
  useRecordContext
} from "react-admin"
import { FirebaseDataProvider } from "react-admin-firebase"
import type { Flag } from "../components/moderation"
import { loadFlags } from "../components/moderation"

/*
form where they can approve a thing
table where they can view the things
tag with date, reviewer, etc
allow comments
*/

const ListFlags = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="status" />
        <TextField source="moderatorId" />
        <TextField source="testimonyText" />
      </Datagrid>
      <div>
        <button onClick={loadFlags}>load flags</button>
      </div>
    </List>
  )
}

const ShowTestimonyText = () => {
  const record: Flag = useRecordContext()
  console.log("showtext", record.testimonyText)
  return (
    <Card style={{ flex: 5 }}>
      <Card.Header>Reported Testimony</Card.Header>
      <Card.Body>
        <Card.Text>{record.testimonyText}</Card.Text>
      </Card.Body>
    </Card>
  )
}

const ShowInfo = () => {
  const record: Flag = useRecordContext()
  return (
    <Card style={{ flex: 1 }}>
      <Card.Header>Flag Info</Card.Header>
      <div
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "10px 20px 10px 10px"
        }}
      >
        <Labeled label="Flag Id">
          <TextField source="id" />
        </Labeled>
        <Labeled label="Time Flaged">
          <TextField source="flagTime" />
        </Labeled>
        <Labeled label="Status">
          <TextField source="status" />
        </Labeled>
        <Labeled label="User Reason">
          <TextField source="userReason" />
        </Labeled>
      </div>
    </Card>
  )
}

const ShowModeration = () => {
  return (
    <Card>
      <Card.Header>Moderation</Card.Header>
      <Card style={{ flexDirection: "row" }}>
        <Card.Body style={{ flex: 1 }}>
          <Labeled label="Moderation Date">
            <DateField source={"moderationDate"} />
          </Labeled>
        </Card.Body>
        <Card.Body style={{ flex: 5 }}>
          <Labeled label="Moderator Comment">
            <TextField source={"moderatorComment"} />
          </Labeled>
        </Card.Body>
      </Card>
      <Card.Body>
        <Labeled label="Removed?">
          <BooleanField looseValue={false} source={"removed"} />
        </Labeled>
      </Card.Body>
      <Card.Body>
        <Labeled label="Resolved?">
          <BooleanField  looseValue={false} source={"resolved"}/>
        </Labeled>
      </Card.Body>
    </Card>
  )
}

const EditFlags = () => {
  const record = useRecordContext()

  return (
    <Form>
      <Box sx={{ display: "flex" }}>
        <ShowInfo />
        <ShowTestimonyText />
      </Box>
      <ShowModeration />
    </Form>
  )
}

const App = () => {
  const dataProvider = FirebaseDataProvider({}, { app })
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={`flags`}
        list={ListFlags}
        edit={() => {
          return (
            <Edit>
              <EditFlags />
            </Edit>
          )
        }}
      />
      {/* if you are using emulators, you can use this to load the dummy data */}
      {/* <Resource name="events" list={ListFlags}/> */}
    </Admin>
  )
}


export default App
