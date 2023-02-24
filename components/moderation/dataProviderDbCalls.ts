import { firestore } from "components/firebase"
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query
} from "firebase/firestore"
import {
  GetListParams, Identifier, RaRecord
} from "ra-core/src/types"

export async function queryCollectionGroup(resource: string) {
  const myquery = query(collectionGroup(firestore, resource))
  const querySnapshot = await getDocs(myquery)
  return querySnapshot
}
export async function queryCollectionSingle(resource: string) {
  const myCollection = collection(firestore, resource)
  const snap = await getDocs(myCollection)
  return snap
}

export const getMyOne = async (
  resource: string,
  params: { id: Identifier }
) => {
  const docRef = doc(firestore, params.id)
  const data = await getDoc(docRef).then(doc => doc.data())
  const raData = data && { ...data, id: docRef.path as Identifier }
  return { data: raData }
}

const listParamsDefault = {
  filter: {},
  sort: { field: "date", order: "DESC" },
  pagination: { page: 1, perPage: 50 }
}

interface ListResult<RecordType extends RaRecord = any> {
  data: RecordType[]
  total?: number
  pageInfo?: any
}

/*** */

export const getMyListGroup = async (
  resource: string,
  params: GetListParams = listParamsDefault
): Promise<ListResult> => {
  const snap = await queryCollectionGroup(resource)
  const docs = snap.docs
  const result: ListResult = {
    data: docs.map(doc => {
      const baseData = doc.data()
      return { id: doc.ref.path, ...baseData }
    }),
    total: snap.size,
    pageInfo: null
  }

  return result
}

export const getMyListCollection = async (
  resource: string,
  params: GetListParams = listParamsDefault
) => {
  const snap = await queryCollectionSingle(resource)
  const docs = snap.docs
  const result: ListResult = {
    data: docs.map(doc => {
      return { id: doc.ref.path, ...doc.data() }
    }),
    total: snap.size,
    pageInfo: null
  }

  return result
}
