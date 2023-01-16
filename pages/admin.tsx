import type { NextPage } from "next"
import dynamic from "next/dynamic"

const App = dynamic(() => import("../components/admin/admin"), { ssr: false })

const Admin: NextPage = () => {
  return <App />
}

export default Admin
