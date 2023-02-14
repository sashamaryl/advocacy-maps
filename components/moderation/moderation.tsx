/**
 * view flagged testimony list
 * view flagged testimony content
 * select for viewing
 * select for deletion
 * perform delete
 * record userid, pubid, moderator id, and time of deletion
 */

import { Claim, useAuth } from "components/auth"
import { Testimony } from "components/db"
import { app } from "components/firebase"
import { useState } from "react"
import { Admin, ListGuesser, Resource } from "react-admin"
import { FirebaseDataProvider } from "react-admin-firebase"

/**
 * collection with form response author id, pub id, who flagged it, reason, review status
 * display list, filter by review status, for-review are new ones
 *
 * when you want to sumbit review or make a decision we need to update the user
 *
 */

const dataProvider = FirebaseDataProvider(app.options, {})

export function ModerateTestimony() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  )
}
