/**
 * affordances:
 * view flagged testimony list
 * view flagged testimony content
 * select for viewing
 * select for deletion
 * perform delete
 *  
 * record:
 * userid, pubid, moderator id, and time of deletion
 */
/**
 * add flag collection with: 
 * form response author id, 
 * pub id, 
 * who flagged it, 
 * reason, 
 * review status
 * 
 * view: 
 * display all, 
 * filter by review status, 
 * for-review are new ones
 *
 * when you want to sumbit review or make a decision we need to notify the user
 *
 */

import { Box } from "@mui/material"
import { Card } from "components/bootstrap"
import { app } from "components/firebase"
import {
  Admin,
  BooleanField,
  Datagrid,
  DateField,
  Edit,
  EditGuesser,
  Form,
  Labeled,
  List,
  ListGuesser,
  Resource,
  TextField,
  useRecordContext
} from "react-admin"
import { FirebaseDataProvider } from "react-admin-firebase"
import Dashboard from "./dashboard"
import {
  getMyListGroup,
  getMyOne
} from "./dataProviderDbCalls"
import type { Flag } from "./types"

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
    </List>
  )
}

const ShowTestimonyText = () => {
  const record: Flag = useRecordContext()
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
          <BooleanField looseValue={false} source={"resolved"} />
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
  const myDataProvider = {
    ...dataProvider,
    getList: getMyListGroup,
    getOne: getMyOne
  }

  return (
    <Admin dataProvider={myDataProvider} dashboard={Dashboard}>
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
      <Resource name={"profiles"} list={ListGuesser} edit={EditGuesser} />
      <Resource
        name={"publishedTestimony"}
        list={ListGuesser}
        edit={EditGuesser}
      />
      <Resource name={"users"} list={ListGuesser} edit={EditGuesser} />
    </Admin>
  )
}

export default App
