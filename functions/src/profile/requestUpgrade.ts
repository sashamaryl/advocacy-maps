import { https } from "firebase-functions"

export const requestUpgrade = https.onCall(async (data, context) => {
  console.log(data, context)
})
