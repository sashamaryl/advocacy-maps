import { requestUpgrade } from "components/db"
import { app } from "components/firebase"
import editprofile from "pages/editprofile"
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
  Create,
  BooleanField
} from "react-admin"
import { FirebaseDataProvider } from "react-admin-firebase"
import Card from "react-bootstrap/esm/Card"

export default function App() {
  const dataProvider = FirebaseDataProvider(app.options, {})
  const committees = "generalCourts/192/committees"
  const profiles = "profiles"

  const endpoint = profiles

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name={endpoint}
        list={ListProfiles}
        edit={EditProfile}
        create={CreateProfile}
      />
      <Resource
        name={endpoint}
        list={ListProfiles}
        edit={EditProfile}
        create={CreateProfile}
      />
    </Admin>
  )
}

const ListProfiles = () => {
  const textFields = ["id", "about", "displayName", "organization", "public"]
  const complexFields = ["representative", "senator", "social"]

  return (
    <List>
      <Card>
        <Card.Header>Profiles</Card.Header>
        <Datagrid rowClick="edit">
          {textFields.map(t => (
            <TextField key="t" source={t} />
          ))}
        </Datagrid>
      </Card>
    </List>
  )
}

const EditProfile = () => {
  const textFields = ["id", "about", "displayName", "organization", "public"]
  const complexFields = ["representative", "senator", "social"]

  return (
    <Edit>
      <Form>
        {textFields.map(t => (
          <TextInput key={t} source={t} />
        ))}
        <Resource name="representative" list={ListGuesser} />
      </Form>
    </Edit>
  )
}

const CreateProfile = () => {
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
