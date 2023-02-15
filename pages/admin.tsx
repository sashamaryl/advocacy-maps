import { dbService } from "components/db/api"
import { createPage } from "components/page"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Router from "next/router"
import { useEffect } from "react"
import { wrapper } from "components/store"
import { z } from "zod"

const App = dynamic(() => import("../components/admin/admin"), { ssr: false })

const Admin: NextPage = () => {
return <App />
}

// export default createPage({
//   title: "Admin",
//   Page: () => {
//     return <App />
//   }
// })



export default Admin