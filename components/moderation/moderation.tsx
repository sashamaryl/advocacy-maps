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
import { useState } from "react"

/**
 * collection with form response author id, pub id, who flagged it, reason, review status 
 * display list, filter by review status, for-review are new ones
 * 
 * when you want to sumbit review or make a decision we need to update the user 
 * 
*/

function ListTestimony({
  list,
  selectItem
}: {
  list: Testimony[]
  selectItem(item: Testimony): void
}) {
  const [willDelete, setWillDelete] = useState<string[]>([])

  return (
    <>
      {list.map(t => (
        <TestimonyListItem
          key={t.id}
          item={t}
          willDelete={willDelete?.includes(t.id)}
          selectItem={selectItem}
        />
      ))}
    </>
  )
}

function TestimonyListItem({
  item,
  willDelete,
  selectItem,
  isSelected
}: {
  item: Testimony
  willDelete: boolean
  selectItem(item: Testimony): void
  isSelected: boolean
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: isSelected ? "gray" : "white"
        }}
        onClick={() => selectItem(item)}
      >
        <div>{item.id}</div>
        <div>{item.authorDisplayName}</div>
        <div>{item.authorUid}</div>
        <div>
          <input type="checkbox" checked={willDelete} value={"delete"} />
        </div>
      </div>
    </>
  )
}

function TestimonyContent({ item }: { item?: Testimony }) {
  return <>{item?.content || "click on an item to view content"}</>
}

export default function ModerateTestimony({
  flaggedTestimony
}: {
  flaggedTestimony: Testimony[]
}) {
  const { user, claims } = useAuth()
  const uid = user?.uid
  const role = claims?.role

  const [selectedItem, setSelectedItem] = useState<Testimony>()
  const [willDelete, setWillDelete] = useState<string[]>([])

  function selectItem(item: Testimony) {
    setSelectedItem(item)
  }

  
  

  return (
    <>
      <TestimonyContent item={selectedItem} />
      <ListTestimony list={flaggedTestimony} selectItem={selectItem} willDelete={willDelete} />
    </>
  )
}
