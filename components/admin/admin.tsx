import { app } from "components/firebase"
import { FC } from "react"
import {
  Admin,
  Resource,
  ListGuesser,
  Datagrid,
  TextField,
  List,
  Edit,
  Form,
  TextInput,
  Create
} from "react-admin"
import { FirebaseDataProvider } from "react-admin-firebase"

export default function App() {
  console.log(app.options)
  const dataProvider = FirebaseDataProvider(app.options, {})

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="generalCourts/192/committees"
        list={ListCommittees}
        edit={EditCommittees}
        create={CreateCommittees}
      />
      <Resource name="profiles" list={ListGuesser} />
      {/* edit={EditProfile}/> */}
      {/* Create={CreateProfile}/> */}
    </Admin>
  )
}

const ListProfile = () => {
  ;<List>
    <Datagrid rowClick="edit"></Datagrid>
  </List>
}

const ListCommittees = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source={"id"} />
      </Datagrid>
    </List>
  )
}

const EditCommittees = () => {
  return (
    <Edit>
      <Form>
        <TextInput source="id" />
      </Form>
    </Edit>
  )
}

const CreateCommittees = () => {
  return (
    <Create>
      <Form>
        <TextInput source="id" />
      </Form>
    </Create>
  )
}

/* 

form where they can approve a thing
table where they can view the things
tag with date, reviewer, etc
allow comments



*/
